/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../contracts/RouteFactory.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />

import RouteFactory = NajsFramework.Contracts.Routing.RouteFactory
import Middleware = NajsRouting.Middleware
import Target = NajsRouting.Target

import { Facade, IFacadeContainer, IFacadeBase } from 'najs-facade'
import { make } from 'najs-binding'

export class RouteFacadeFactory {
  static make<T extends Target = Target, M = Middleware, FacadeDefinition = IFacadeBase>(
    container: IFacadeContainer,
    routeManagerClassName?: string,
    routeFactoryClassName?: string
  ): RouteFactory<T, M> & FacadeDefinition {
    return Facade.create<RouteFactory<T, M>>(container, 'route', function() {
      return make<RouteFactory<T, M>>(routeFactoryClassName, [make(routeManagerClassName)])
    }) as any
  }
}
