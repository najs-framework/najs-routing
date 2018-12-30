/// <reference path="../../../lib/contracts/MiddlewareResolver.d.ts" />
export declare class MiddlewareDummyResolver implements NajsFramework.Contracts.Routing.MiddlewareResolver<any, string> {
    isValid(middleware: string): boolean;
    resolve(middleware: string): string;
}
