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

import { Facade } from 'najs-facade'
import { register } from 'najs-binding'
import { RouteBuilder } from './RouteBuilder'
import { HttpVerbs } from './mixin/HttpVerbs'
import { ClassNames } from '../constants'

export class RouteFactory<T = Target, M = Middleware> extends Facade {
  static className: string = ClassNames.RouteFactory

  protected manager: RouteManagerContract<T, M>

  constructor(manager: RouteManagerContract<T, M>) {
    super()
    this.manager = manager
  }

  getClassName() {
    return ClassNames.RouteFactory
  }

  makeBuilder(): RouteBuilder<T, M> {
    return new RouteBuilder(this.manager)
  }

  usingBuilder(builder: RouteBuilder<T, M>): RouteBuilder<T, M> {
    this.manager.addBuilder(builder)
    return builder
  }

  middleware(...list: Array<M | M[]>): any {
    return this.usingBuilder(this.makeBuilder().middleware(...list))
  }

  prefix(prefix: string): any {
    return this.usingBuilder(this.makeBuilder().prefix(prefix))
  }

  group(cb: () => void): any {
    return this.usingBuilder(this.makeBuilder().group(cb))
  }

  name(name: string): any {
    return this.usingBuilder(this.makeBuilder().name(name))
  }

  method(method: HttpMethod | 'all', path: string, target: T): any {
    return this.usingBuilder(this.makeBuilder().method(method, path, target))
  }
}

Object.assign(RouteFactory.prototype, HttpVerbs)
register(RouteFactory, ClassNames.RouteFactory)
