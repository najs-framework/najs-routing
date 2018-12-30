/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />

namespace NajsFramework.Contracts.Routing {
  export interface TargetResolver<V = any, T = NajsRouting.Target> {
    isValid(target: T): boolean

    resolve(target: T, route: NajsRouting.IRoute<T, any>): V
  }
}
