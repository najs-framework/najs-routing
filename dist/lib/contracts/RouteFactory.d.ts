/// <reference path="../definitions/Grammar.d.ts" />
declare namespace NajsFramework.Contracts.Routing {
    interface RouteFactory<T extends NajsRouting.Target = NajsRouting.Target, M = NajsRouting.Middleware> extends NajsRouting.Grammar.Routing<T, M> {
    }
}
