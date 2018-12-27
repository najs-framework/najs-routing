/// <reference path="../contracts/RouteManager.d.ts" />
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
export declare class RouteManager<T extends Target = Target, M = Middleware> extends Facade implements NajsFramework.Contracts.Routing.RouteManager<T, M> {
    protected changed: boolean;
    protected builders: IRouteBuilder<T, M>[];
    protected routes: IRoute<T, M>[];
    protected routesNamed: {
        [key in string]: IRoute<T, M>;
    };
    protected middlewareRegistered: {
        [key in string]: MiddlewareResolver<object, M>;
    };
    protected middlewareResolvers: MiddlewareResolver<object, M>[];
    protected targetRegistered: {
        [key in string]: TargetResolver<object, T>;
    };
    protected targetResolvers: TargetResolver<object, T>[];
    constructor();
    isChanged(): boolean;
    getRoutes(): IRoute<T, M>[];
    addBuilder(builder: IRouteBuilder<T, M>): void;
    hasRoute(name: string): boolean;
    findOrFail(name: string): IRoute<T, M>;
    registerTargetResolver<V extends object>(resolver: TargetResolver<V, T>, name: string): this;
    registerMiddlewareResolver<V extends object>(resolver: MiddlewareResolver<V, M>, name: string): this;
    getTargetResolvers(): TargetResolver<any, T>[];
    getMiddlewareResolvers(): MiddlewareResolver<any, M>[];
}
