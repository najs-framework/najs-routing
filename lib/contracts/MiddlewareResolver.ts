/// <reference path="../definitions/Middleware.ts" />

namespace NajsFramework.Contracts.Routing {
  export interface MiddlewareResolver<V extends object, M = NajsRouting.Middleware> {
    isValid(middleware: M): boolean

    resolve(middleware: M): V | V[]
  }
}
