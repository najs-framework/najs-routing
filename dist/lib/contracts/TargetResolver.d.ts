/// <reference path="../definitions/Target.d.ts" />
/// <reference path="../definitions/IRoute.d.ts" />
declare namespace NajsFramework.Contracts.Routing {
    interface TargetResolver<V = any, T = NajsRouting.Target> {
        isValid(target: T): boolean;
        resolve(target: T, route: NajsRouting.IRoute<T, any>): V;
    }
}
