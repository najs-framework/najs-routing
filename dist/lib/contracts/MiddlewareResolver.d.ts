/// <reference path="../definitions/Middleware.d.ts" />
declare namespace NajsFramework.Contracts.Routing {
    interface MiddlewareResolver<V = any, M = NajsRouting.Middleware> {
        isValid(middleware: M): boolean;
        resolve(middleware: M): V | V[];
    }
}
