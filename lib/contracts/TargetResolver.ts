/// <reference path="../definitions/Target.ts" />

namespace NajsFramework.Contracts.Routing {
  export interface TargetResolver<V = any, T = NajsRouting.Target> {
    isValid(target: T): boolean

    resolve(target: T): V
  }
}
