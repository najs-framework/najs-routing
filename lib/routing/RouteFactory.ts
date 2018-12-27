/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../contracts/RouteFactory.ts" />
/// <reference path="../contracts/MiddlewareResolver.ts" />
/// <reference path="../contracts/TargetResolver.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/HttpMethod.ts" />

import Middleware = NajsRouting.Middleware
import Target = NajsRouting.Target
import HttpMethod = NajsRouting.HttpMethod
import RouteManagerContract = NajsFramework.Contracts.Routing.RouteManager

import { flatten } from 'lodash'
import { Facade } from 'najs-facade'
import { RouteBuilder } from './RouteBuilder'
import { HttpVerbs } from './mixin/HttpVerbs'

export class RouteFactory<T extends Target = Target, M = Middleware> extends Facade {
  protected manager: RouteManagerContract<T, M>

  constructor(manager: RouteManagerContract<T, M>) {
    super()
    this.manager = manager
  }

  makeBuilder(): RouteBuilder<T, M> {
    return new RouteBuilder()
  }

  validateMiddleware(middleware: M): boolean {
    return this.validateByResolvers(middleware, this.manager.getMiddlewareResolvers())
  }

  validateTarget(target: T): boolean {
    return this.validateByResolvers(target, this.manager.getTargetResolvers())
  }

  validateByResolvers(item: M | T, resolvers: Array<{ isValid(item: M | T): boolean }>): boolean {
    for (const resolver of resolvers) {
      if (!resolver.isValid(item)) {
        return false
      }
    }
    return true
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
    this.manager.addBuilder(this.makeBuilder().middleware(...middlewareList))

    return this
  }

  prefix(prefix: string): any {
    this.manager.addBuilder(this.makeBuilder().prefix(prefix))

    return this
  }

  group(cb: () => void): any {
    this.manager.addBuilder(this.makeBuilder().group(cb))

    return this
  }

  name(name: string): any {
    this.manager.addBuilder(this.makeBuilder().name(name))

    return this
  }

  method(method: HttpMethod | 'all', path: string, target: T): any {
    if (!this.validateTarget(target)) {
      // TODO: display warning message or error
      return this
    }
    this.manager.addBuilder(this.makeBuilder().method(method, path, target))

    return this
  }
}

Object.assign(RouteFactory.prototype, HttpVerbs)
