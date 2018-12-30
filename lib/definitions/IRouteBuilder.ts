/// <reference path="./Grammar.ts" />
/// <reference path="./Middleware.ts" />
/// <reference path="./Target.ts" />

namespace NajsRouting {
  export interface IRouteBuilder<T = Target, M = Middleware> extends Grammar.Routing<T, M> {
    getRoutes(parent?: IRoute<T, M>): IRouteData<T, M>[]

    isContainer(): boolean

    appendChild(builder: IRouteBuilder<T, M>): void
  }
}
