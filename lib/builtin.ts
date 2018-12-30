/// <reference path="./contracts/RouteManager.ts" />
/// <reference path="./contracts/RouteFactory.ts" />

import { Route as RouteClass } from './routing/Route'
import { RouteBuilder as RouteBuilderClass } from './routing/RouteBuilder'
import { RouteManager as RouteManagerClass } from './routing/RouteManager'
import { RouteFactory as RouteFactoryClass } from './routing/RouteFactory'
import * as NajsBinding from 'najs-binding'
import { Facade, IFacadeContainer, IFacadeBase } from 'najs-facade'

export namespace NajsRouting {
  export function make<T = string, M = string>(
    container: IFacadeContainer,
    routeFactoryClassName?: string,
    routeManagerClassName?: string
  ): [
    NajsFramework.Contracts.Routing.RouteManager<T, M>,
    NajsFramework.Contracts.Routing.RouteFactory<T, M> & IFacadeBase
  ] {
    const manager = NajsBinding.make<NajsFramework.Contracts.Routing.RouteManager<T, M>>(
      routeManagerClassName || RouteManagerClass.className
    )

    const factory = Facade.create<NajsFramework.Contracts.Routing.RouteFactory<T, M>>(container, 'route', function() {
      return NajsBinding.make(routeFactoryClassName || RouteFactoryClass.className, [manager])
    })
    return [manager, factory]
  }

  export const Route: typeof RouteClass = RouteClass
  export interface Route<T = string, M = string> extends RouteClass<T, M> {}

  export const RouteBuilder: typeof RouteBuilderClass = RouteBuilderClass
  export interface RouteBuilder<T = string, M = string> extends RouteBuilderClass<T, M> {}

  export const RouteManager: typeof RouteManagerClass = RouteManagerClass
  export interface RouteManager<T = string, M = string> extends RouteManagerClass<T, M> {}

  export const RouteFactory: typeof RouteFactoryClass = RouteFactoryClass
  export interface RouteFactory<T = string, M = string> extends RouteFactoryClass<T, M> {}
}
