/// <reference path="../definitions/Middleware.d.ts" />
/// <reference path="../definitions/Target.d.ts" />
/// <reference path="../definitions/IRoute.d.ts" />
/// <reference path="../definitions/IRouteBuilder.d.ts" />
declare namespace Najs.Contracts.Routing {
    interface RouteManager<T extends Najs.Routing.Target = Najs.Routing.Target, M = Najs.Routing.Middleware> {
        getRoutes(): Najs.Routing.IRoute<T, M>[];
        hasRoute(name: string): boolean;
        findOrFail(name: string): Najs.Routing.IRoute<T, M>;
        addBuilder(builder: Najs.Routing.IRouteBuilder<T, M>): void;
        registerTargetResolver<V extends object>(resolver: TargetResolver<V, T>, name: string): this;
        registerMiddlewareResolver<V extends object>(resolver: MiddlewareResolver<V, T>, name: string): this;
        getTargetResolvers(): TargetResolver<any, T>[];
        getMiddlewareResolvers(): MiddlewareResolver<any, T>[];
    }
}
