/// <reference path="../definitions/Grammar.ts" />

namespace Najs.Contracts.Routing {
  export interface RouteFactory<T extends Najs.Routing.Target = Najs.Routing.Target, M = Najs.Routing.Middleware>
    extends Najs.Routing.Grammar.Routing<T, M> {}
}
