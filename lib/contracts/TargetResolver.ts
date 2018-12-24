/// <reference path="../definitions/Target.ts" />

namespace Najs.Contracts.Routing {
  export interface TargetResolver<V extends object, T = Najs.Routing.Target> {
    isValid(target: T): boolean

    resolve(target: T): V
  }
}
