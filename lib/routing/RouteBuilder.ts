/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../definitions/Grammar.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />

import HttpMethod = NajsRouting.HttpMethod
import Middleware = NajsRouting.Middleware
import Target = NajsRouting.Target
import IRoute = NajsRouting.IRoute
import IRouteData = NajsRouting.IRouteData
import IRouteBuilder = NajsRouting.IRouteBuilder
import RouteManagerContract = NajsFramework.Contracts.Routing.RouteManager

import { flatten } from 'lodash'
import { Route } from './Route'
import { HttpVerbs } from './mixin/HttpVerbs'

export interface RouteBuilder<T = Target, M = Middleware> extends NajsRouting.Grammar.Routing<T, M> {}
export class RouteBuilder<T = Target, M = Middleware> implements IRouteBuilder<T, M> {
  protected manager: RouteManagerContract<T, M>
  protected route: Route<T, M>
  protected children: IRouteBuilder<T, M>[]
  protected isGrouping: boolean

  constructor(manager: RouteManagerContract<T, M>) {
    this.manager = manager
    this.route = new Route()
    this.children = []
    this.isGrouping = false
  }

  validateMiddleware(middleware: M): boolean {
    return this.validateByResolvers(middleware, this.manager.getMiddlewareResolvers())
  }

  validateTarget(target: T): boolean {
    return this.validateByResolvers(target, this.manager.getTargetResolvers())
  }

  validateByResolvers(item: M | T, resolvers: Array<{ isValid(item: M | T): boolean }>): boolean {
    if (resolvers.length === 0) {
      return false
    }

    for (const resolver of resolvers) {
      if (resolver.isValid(item)) {
        return true
      }
    }
    return false
  }

  resolveMiddleware(middleware: M, route: IRoute<T, M>): any {
    return this.resolveByResolvers(middleware, route, this.manager.getMiddlewareResolvers())
  }

  resolveTarget(target: T, route: IRoute<T, M>): any {
    return this.resolveByResolvers(target, route, this.manager.getTargetResolvers())
  }

  resolveByResolvers(
    item: M | T,
    route: IRoute<T, M>,
    resolvers: Array<{ isValid(item: M | T): boolean; resolve(item: M | T, route: any): any }>
  ): any {
    if (resolvers.length === 0) {
      return undefined
    }

    for (const resolver of resolvers) {
      if (resolver.isValid(item)) {
        return resolver.resolve(item, route)
      }
    }
    return undefined
  }

  getRoutes(parent?: IRoute<T, M>): IRouteData<T, M>[] {
    if (this.children.length === 0) {
      const data = this.route.getData(parent as any)
      if (data) {
        data['resolvedMiddleware'] = data.middleware.map(middleware => this.resolveMiddleware(middleware, data))
        data['resolvedTarget'] = this.resolveTarget(data.target, data)
        return [data as IRouteData<T, M>]
      }
      return []
    }

    this.route.mergeParentData(parent as any)
    const result = this.children.map(item => {
      return item.getRoutes(this.route as any)
    })
    return flatten(result)
  }

  isContainer(): boolean {
    return this.isGrouping
  }

  appendChild(builder: IRouteBuilder<T, M>): void {
    if (this.children.length === 0) {
      this.children.push(builder)
      return
    }

    const lastChild = this.children[this.children.length - 1]
    if (lastChild.isContainer()) {
      lastChild.appendChild(builder)
      return
    }

    this.children.push(builder)
  }

  middleware(...list: Array<M | M[]>): any {
    const middlewareList = flatten(list).filter(middleware => {
      const isValid = this.validateMiddleware(middleware)
      if (!isValid) {
        // TODO: display warning message or error
        return false
      }
      return true
    })
    this.route.setMiddleware(...middlewareList)

    return this
  }

  prefix(prefix: string): any {
    this.route.setPrefix(prefix)

    return this
  }

  group(cb: () => void): any {
    this.isGrouping = true
    cb.call(undefined)
    this.isGrouping = false

    return this
  }

  name(name: string): any {
    this.route.setName(name)

    return this
  }

  method(method: HttpMethod | 'all', path: string, target: T): any {
    this.route
      .setMethod(method)
      .setPath(path)
      .setArguments(arguments)

    if (!this.validateTarget(target)) {
      // TODO: display warning message or error
      return this
    }

    this.route.setTarget(target)
    return this
  }
}

Object.assign(RouteBuilder.prototype, HttpVerbs)
