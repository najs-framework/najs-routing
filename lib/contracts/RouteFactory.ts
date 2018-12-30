/// <reference path="../definitions/Grammar.ts" />

namespace NajsFramework.Contracts.Routing {
  export interface RouteFactory<T = NajsRouting.Target, M = NajsRouting.Middleware>
    extends NajsRouting.Grammar.Routing<T, M> {}
}
