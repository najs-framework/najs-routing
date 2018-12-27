/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />

namespace NajsFramework.Contracts.Routing {
  export interface RouteManager<T extends NajsRouting.Target = NajsRouting.Target, M = NajsRouting.Middleware> {
    getRoutes(): NajsRouting.IRoute<T, M>[]

    hasRoute(name: string): boolean

    findOrFail(name: string): NajsRouting.IRoute<T, M>

    addBuilder(builder: NajsRouting.IRouteBuilder<T, M>): void

    registerTargetResolver<V extends object>(resolver: TargetResolver<V, T>, name: string): this

    registerMiddlewareResolver<V extends object>(resolver: MiddlewareResolver<V, M>, name: string): this

    getTargetResolvers(): TargetResolver<any, T>[]

    getMiddlewareResolvers(): MiddlewareResolver<any, M>[]
  }
}
