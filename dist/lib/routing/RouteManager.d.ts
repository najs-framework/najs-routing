/// <reference path="../contracts/MiddlewareResolver.d.ts" />
/// <reference path="../contracts/TargetResolver.d.ts" />
/// <reference path="../definitions/Middleware.d.ts" />
/// <reference path="../definitions/Target.d.ts" />
/// <reference path="../definitions/IRoute.d.ts" />
/// <reference path="../definitions/IRouteBuilder.d.ts" />
import Middleware = NajsRouting.Middleware;
import Target = NajsRouting.Target;
import IRoute = NajsRouting.IRoute;
import IRouteBuilder = NajsRouting.IRouteBuilder;
import MiddlewareResolver = NajsFramework.Contracts.Routing.MiddlewareResolver;
import TargetResolver = NajsFramework.Contracts.Routing.TargetResolver;
import { Facade } from 'najs-facade';
export declare class RouteManager<T extends Target = Target, M = Middleware> extends Facade {
    getRoutes(): IRoute<T, M>[];
    hasRoute(name: string): boolean;
    findOrFail(name: string): IRoute<T, M>;
    addBuilder(builder: IRouteBuilder<T, M>): void;
    registerTargetResolver<V extends object>(resolver: TargetResolver<V, T>, name: string): void;
    registerMiddlewareResolver<V extends object>(resolver: MiddlewareResolver<V, T>, name: string): void;
    getTargetResolvers(): TargetResolver<any, T>[];
    getMiddlewareResolvers(): MiddlewareResolver<any, T>[];
}
