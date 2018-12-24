/// <reference path="../definitions/Middleware.d.ts" />
/// <reference path="../definitions/Target.d.ts" />
/// <reference path="../definitions/IRoute.d.ts" />
/// <reference path="../definitions/IRouteBuilder.d.ts" />
declare namespace NajsFramework.Contracts.Routing {
    interface RouteManager<T extends NajsRouting.Target = NajsRouting.Target, M = NajsRouting.Middleware> {
        getRoutes(): NajsRouting.IRoute<T, M>[];
        hasRoute(name: string): boolean;
        findOrFail(name: string): NajsRouting.IRoute<T, M>;
        addBuilder(builder: NajsRouting.IRouteBuilder<T, M>): void;
        registerTargetResolver<V extends object>(resolver: TargetResolver<V, T>, name: string): this;
        registerMiddlewareResolver<V extends object>(resolver: MiddlewareResolver<V, T>, name: string): this;
        getTargetResolvers(): TargetResolver<any, T>[];
        getMiddlewareResolvers(): MiddlewareResolver<any, T>[];
    }
}
