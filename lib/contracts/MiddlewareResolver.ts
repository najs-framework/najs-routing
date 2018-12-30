/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/IRoute.ts" />

namespace NajsFramework.Contracts.Routing {
  export interface MiddlewareResolver<V = any, M = NajsRouting.Middleware> {
    isValid(middleware: M): boolean

    resolve(middleware: M, route: NajsRouting.IRoute<any, V>): V | V[]
  }
}
