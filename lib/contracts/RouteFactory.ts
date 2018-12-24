/// <reference path="../definitions/Grammar.ts" />

namespace NajsFramework.Contracts.Routing {
  export interface RouteFactory<T extends NajsRouting.Target = NajsRouting.Target, M = NajsRouting.Middleware>
    extends NajsRouting.Grammar.Routing<T, M> {}
}
