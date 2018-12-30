/// <reference path="./Middleware.ts" />
/// <reference path="./Target.ts" />
/// <reference path="./HttpMethod.ts" />

namespace NajsRouting {
  export interface IRoute<T = Target, M = Middleware> {
    type?: string
    name?: string
    path: string
    method: HttpMethod | 'all'
    prefix: string
    middleware: M[]
    target: T
    arguments: any[]
  }

  export interface IRouteData<T = Target, M = Middleware> extends IRoute<T, M> {
    resolvedMiddleware: any[]
    resolvedTarget: any
  }
}
