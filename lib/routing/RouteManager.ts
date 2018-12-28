/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../contracts/MiddlewareResolver.ts" />
/// <reference path="../contracts/TargetResolver.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />

import Middleware = NajsRouting.Middleware
import Target = NajsRouting.Target
import IRoute = NajsRouting.IRoute
import IRouteBuilder = NajsRouting.IRouteBuilder
import MiddlewareResolver = NajsFramework.Contracts.Routing.MiddlewareResolver
import TargetResolver = NajsFramework.Contracts.Routing.TargetResolver

import { flatten } from 'lodash'
import { Facade } from 'najs-facade'
import { RouteNotFoundError } from '../errors/RouteNotFoundError'

export class RouteManager<T extends Target = Target, M = Middleware> extends Facade
  implements NajsFramework.Contracts.Routing.RouteManager<T, M> {
  protected changed: boolean = false
  protected builders: IRouteBuilder<T, M>[]
  protected routes: IRoute<T, M>[]
  protected routesNamed: { [key in string]: IRoute<T, M> }
  protected middlewareRegistered: { [key in string]: MiddlewareResolver<object, M> }
  protected middlewareResolvers: MiddlewareResolver<object, M>[]
  protected targetRegistered: { [key in string]: TargetResolver<object, T> }
  protected targetResolvers: TargetResolver<object, T>[]

  constructor() {
    super()
    this.builders = []
    this.routes = []
    this.routesNamed = {}
    this.changed = false
    this.targetRegistered = {}
    this.targetResolvers = []
    this.middlewareRegistered = {}
    this.middlewareResolvers = []
  }

  isChanged(): boolean {
    return this.changed
  }

  getRoutes(): IRoute<T, M>[] {
    if (this.changed) {
      this.routes = flatten(this.builders.map(builder => builder.getRoutes()))
      this.routesNamed = this.routes.reduce((memo, item) => {
        if (item.name) {
          // TODO: display warning message or error
          // if (typeof memo[item.name] !== 'undefined' && this.options.duplicatedNameWarning) {
          // Logger.warn('Duplicated named')
          // }
          memo[item.name] = item
        }
        return memo
      }, {})
      this.changed = false
    }
    return this.routes
  }

  addBuilder(builder: IRouteBuilder<T, M>): void {
    this.changed = true

    if (this.builders.length === 0) {
      this.builders.push(builder)
      return
    }

    const lastBuilder = this.builders[this.builders.length - 1]
    if (lastBuilder.isContainer()) {
      lastBuilder.appendChild(builder)
      return
    }

    this.builders.push(builder)
  }

  hasRoute(name: string): boolean {
    return typeof this.routesNamed[name] !== 'undefined'
  }

  findOrFail(name: string): IRoute<T, M> {
    this.getRoutes()
    if (!this.hasRoute(name)) {
      throw new RouteNotFoundError(name)
    }
    return this.routesNamed[name]
  }

  registerTargetResolver<V extends object>(resolver: TargetResolver<V, T>, name: string): this {
    this.targetRegistered[name] = resolver
    this.targetResolvers = Object.values(this.targetRegistered)
    return this
  }

  registerMiddlewareResolver<V extends object>(resolver: MiddlewareResolver<V, M>, name: string): this {
    this.middlewareRegistered[name] = resolver
    this.middlewareResolvers = Object.values(this.middlewareRegistered)
    return this
  }

  getTargetResolvers(): TargetResolver<any, T>[] {
    return this.targetResolvers
  }

  getMiddlewareResolvers(): MiddlewareResolver<any, M>[] {
    return this.middlewareResolvers
  }
}
