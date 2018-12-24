/// <reference path="./Grammar.ts" />
/// <reference path="./Middleware.ts" />
/// <reference path="./Target.ts" />

namespace NajsRouting {
  export interface IRouteBuilder<T extends Target = Target, M = Middleware> extends Grammar.Routing<T, M> {
    getRoutes(): IRoute[]

    isContainer(): boolean

    appendChild(builder: IRouteBuilder<T, M>): void
  }
}
