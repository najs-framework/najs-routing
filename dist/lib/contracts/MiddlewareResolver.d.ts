/// <reference path="../definitions/Middleware.d.ts" />
declare namespace Najs.Contracts.Routing {
    interface MiddlewareResolver<V extends object, M = Najs.Routing.Middleware> {
        isValid(middleware: M): boolean;
        resolve(middleware: M): V | V[];
    }
}
