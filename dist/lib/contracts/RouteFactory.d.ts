/// <reference path="../definitions/Grammar.d.ts" />
declare namespace Najs.Contracts.Routing {
    interface RouteFactory<T extends Najs.Routing.Target = Najs.Routing.Target, M = Najs.Routing.Middleware> extends Najs.Routing.Grammar.Routing<T, M> {
    }
}
