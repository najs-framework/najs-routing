/// <reference path="../definitions/HttpMethod.d.ts" />
/// <reference path="../definitions/Middleware.d.ts" />
/// <reference path="../definitions/Target.d.ts" />
/// <reference path="../definitions/IRoute.d.ts" />
import HttpMethod = NajsRouting.HttpMethod;
import Middleware = NajsRouting.Middleware;
import Target = NajsRouting.Target;
import IRoute = NajsRouting.IRoute;
export declare class Route<T extends Target = Target, M = Middleware> {
    protected name?: string;
    protected method?: HttpMethod | 'all';
    protected path?: string;
    protected prefix: string;
    protected middleware: M[];
    protected target?: T;
    protected arguments?: any[];
    protected isMerged: boolean;
    constructor();
    setMethod(method: HttpMethod | 'all'): this;
    setName(name: string): this;
    setPath(path: string): this;
    setPrefix(prefix: string): this;
    setMiddleware(...middleware: M[]): this;
    setTarget(target: T): this;
    setArguments(args: ArrayLike<any>): this;
    isValid(): boolean;
    mergeParentData(parent?: Route<T, M>): void;
    mergePrefix(lhs: string, rhs: string, separator?: string): string;
    getData(parent?: Route<T, M>): IRoute<T, M> | undefined;
}
