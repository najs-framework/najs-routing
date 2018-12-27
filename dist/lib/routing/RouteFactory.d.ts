/// <reference path="../contracts/RouteManager.d.ts" />
/// <reference path="../contracts/RouteFactory.d.ts" />
/// <reference path="../contracts/MiddlewareResolver.d.ts" />
/// <reference path="../contracts/TargetResolver.d.ts" />
/// <reference path="../definitions/Middleware.d.ts" />
/// <reference path="../definitions/Target.d.ts" />
/// <reference path="../definitions/HttpMethod.d.ts" />
import Middleware = NajsRouting.Middleware;
import Target = NajsRouting.Target;
import HttpMethod = NajsRouting.HttpMethod;
import RouteManagerContract = NajsFramework.Contracts.Routing.RouteManager;
import { Facade } from 'najs-facade';
import { RouteBuilder } from './RouteBuilder';
export declare class RouteFactory<T extends Target = Target, M = Middleware> extends Facade {
    protected manager: RouteManagerContract<T, M>;
    constructor(manager: RouteManagerContract<T, M>);
    makeBuilder(): RouteBuilder<T, M>;
    validateMiddleware(middleware: M): boolean;
    validateTarget(target: T): boolean;
    validateByResolvers(item: M | T, resolvers: Array<{
        isValid(item: M | T): boolean;
    }>): boolean;
    middleware(...list: Array<M | M[]>): any;
    prefix(prefix: string): any;
    group(cb: () => void): any;
    name(name: string): any;
    method(method: HttpMethod | 'all', path: string, target: T): any;
}
