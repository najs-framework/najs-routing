/// <reference path="../definitions/Target.d.ts" />
declare namespace Najs.Contracts.Routing {
    interface TargetResolver<V extends object, T = Najs.Routing.Target> {
        isValid(target: T): boolean;
        resolve(target: T): V;
    }
}
