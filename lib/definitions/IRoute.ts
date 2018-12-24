/// <reference path="./Middleware.ts" />
/// <reference path="./Target.ts" />
/// <reference path="./HttpMethod.ts" />

namespace Najs.Routing {
  export interface IRoute<T extends Target = Target, M = Middleware> {
    name?: string
    path: string
    method: HttpMethod | 'all'
    prefix: string
    middleware: M[]
    target: T
    arguments: any[]
  }
}
