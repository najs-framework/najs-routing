/// <reference path="../definitions/Middleware.ts" />

namespace Najs.Contracts.Routing {
  export interface MiddlewareResolver<V extends object, M = Najs.Routing.Middleware> {
    isValid(middleware: M): boolean

    resolve(middleware: M): V | V[]
  }
}
