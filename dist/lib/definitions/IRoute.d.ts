/// <reference path="Middleware.d.ts" />
/// <reference path="Target.d.ts" />
/// <reference path="HttpMethod.d.ts" />
declare namespace Najs.Routing {
    interface IRoute<T extends Target = Target, M = Middleware> {
        name?: string;
        path: string;
        method: HttpMethod | 'all';
        prefix: string;
        middleware: M[];
        target: T;
        arguments: any[];
    }
}
