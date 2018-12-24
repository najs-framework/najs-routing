/// <reference path="Grammar.d.ts" />
/// <reference path="Middleware.d.ts" />
/// <reference path="Target.d.ts" />
declare namespace Najs.Routing {
    interface IRouteBuilder<T extends Target = Target, M = Middleware> extends Grammar.Routing<T, M> {
        getRoutes(): IRoute[];
        isContainer(): boolean;
        appendChild(builder: IRouteBuilder<T, M>): void;
    }
}
