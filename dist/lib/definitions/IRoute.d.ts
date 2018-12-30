/// <reference path="Middleware.d.ts" />
/// <reference path="Target.d.ts" />
/// <reference path="HttpMethod.d.ts" />
declare namespace NajsRouting {
    interface IRoute<T = Target, M = Middleware> {
        type?: string;
        name?: string;
        path: string;
        method: HttpMethod | 'all';
        prefix: string;
        middleware: M[];
        target: T;
        arguments: any[];
    }
    interface IRouteData<T = Target, M = Middleware> extends IRoute<T, M> {
        resolvedMiddleware: any[];
        resolvedTarget: any;
    }
}
