/// <reference path="../definitions/Middleware.d.ts" />
/// <reference path="../definitions/IRoute.d.ts" />
declare namespace NajsFramework.Contracts.Routing {
    interface MiddlewareResolver<V = any, M = NajsRouting.Middleware> {
        isValid(middleware: M): boolean;
        resolve(middleware: M, route: NajsRouting.IRoute<any, V>): V | V[];
    }
}
