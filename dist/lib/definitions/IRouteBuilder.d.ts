/// <reference path="Grammar.d.ts" />
/// <reference path="Middleware.d.ts" />
/// <reference path="Target.d.ts" />
declare namespace NajsRouting {
    interface IRouteBuilder<T = Target, M = Middleware> extends Grammar.Routing<T, M> {
        getRoutes(parent?: IRoute<T, M>): IRouteData<T, M>[];
        isContainer(): boolean;
        appendChild(builder: IRouteBuilder<T, M>): void;
    }
}
