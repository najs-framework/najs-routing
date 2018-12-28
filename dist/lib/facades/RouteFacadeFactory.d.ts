/// <reference path="../contracts/RouteManager.d.ts" />
/// <reference path="../contracts/RouteFactory.d.ts" />
/// <reference path="../definitions/Middleware.d.ts" />
/// <reference path="../definitions/Target.d.ts" />
import RouteFactory = NajsFramework.Contracts.Routing.RouteFactory;
import Middleware = NajsRouting.Middleware;
import Target = NajsRouting.Target;
import { IFacadeContainer, IFacadeBase } from 'najs-facade';
export declare class RouteFacadeFactory {
    static make<T extends Target = Target, M = Middleware, FacadeDefinition = IFacadeBase>(container: IFacadeContainer, routeManagerClassName?: string, routeFactoryClassName?: string): RouteFactory<T, M> & FacadeDefinition;
}
