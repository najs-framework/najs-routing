/// <reference path="../definitions/Grammar.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />

import HttpMethod = NajsRouting.HttpMethod
import Middleware = NajsRouting.Middleware
import Target = NajsRouting.Target
import IRoute = NajsRouting.IRoute
import IRouteBuilder = NajsRouting.IRouteBuilder

import { flatten } from 'lodash'
import { Route } from './Route'
import { HttpVerbs } from './mixin/HttpVerbs'

export interface RouteBuilder<T extends Target = Target, M = Middleware> extends NajsRouting.Grammar.Routing<T, M> {}
export class RouteBuilder<T extends Target = Target, M = Middleware> implements IRouteBuilder<T, M> {
  protected route: Route<T, M>
  protected children: IRouteBuilder<T, M>[]
  protected isGrouping: boolean

  constructor() {
    this.route = new Route()
    this.children = []
    this.isGrouping = false
  }

  getRoutes(parent?: IRoute<T, M>): IRoute<T, M>[] {
    if (this.children.length === 0) {
      const data = this.route.getData(parent as any)
      return data ? [data] : []
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
    const middleware = flatten(list)
    this.route.setMiddleware(...middleware)

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
      .setTarget(target)

    return this
  }
}

Object.assign(RouteBuilder.prototype, HttpVerbs)
