/// <reference path="../contracts/MiddlewareResolver.ts" />
/// <reference path="../contracts/TargetResolver.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />

import Middleware = Najs.Routing.Middleware
import Target = Najs.Routing.Target
import IRoute = Najs.Routing.IRoute
import IRouteBuilder = Najs.Routing.IRouteBuilder
import MiddlewareResolver = Najs.Contracts.Routing.MiddlewareResolver
import TargetResolver = Najs.Contracts.Routing.TargetResolver

import { Facade } from 'najs-facade'

export class RouteManager<T extends Target = Target, M = Middleware> extends Facade {
  getRoutes(): IRoute<T, M>[] {
    return [] as any
  }

  hasRoute(name: string): boolean {
    return false
  }

  findOrFail(name: string): IRoute<T, M> {
    return {} as any
  }

  addBuilder(builder: IRouteBuilder<T, M>): void {}

  registerTargetResolver<V extends object>(resolver: TargetResolver<V, T>, name: string) {}

  registerMiddlewareResolver<V extends object>(resolver: MiddlewareResolver<V, T>, name: string) {}

  getTargetResolvers(): TargetResolver<any, T>[] {
    return [] as any
  }

  getMiddlewareResolvers(): MiddlewareResolver<any, T>[] {
    return [] as any
  }
}
