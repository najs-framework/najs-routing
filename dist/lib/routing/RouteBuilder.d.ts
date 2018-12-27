/// <reference path="../definitions/Grammar.d.ts" />
/// <reference path="../definitions/IRouteBuilder.d.ts" />
import HttpMethod = NajsRouting.HttpMethod;
import Middleware = NajsRouting.Middleware;
import Target = NajsRouting.Target;
import IRoute = NajsRouting.IRoute;
import IRouteBuilder = NajsRouting.IRouteBuilder;
import { Route } from './Route';
export interface RouteBuilder<T extends Target = Target, M = Middleware> extends NajsRouting.Grammar.Routing<T, M> {
}
export declare class RouteBuilder<T extends Target = Target, M = Middleware> implements IRouteBuilder<T, M> {
    protected route: Route<T, M>;
    protected children: IRouteBuilder<T, M>[];
    protected isGrouping: boolean;
    constructor();
    getRoutes(parent?: IRoute<T, M>): IRoute<T, M>[];
    isContainer(): boolean;
    appendChild(builder: IRouteBuilder<T, M>): void;
    middleware(...list: Array<M | M[]>): any;
    prefix(prefix: string): any;
    group(cb: () => void): any;
    name(name: string): any;
    method(method: HttpMethod | 'all', path: string, target: T): any;
}
