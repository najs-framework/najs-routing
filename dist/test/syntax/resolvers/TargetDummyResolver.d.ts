/// <reference path="../../../lib/contracts/TargetResolver.d.ts" />
export declare class TargetDummyResolver implements NajsFramework.Contracts.Routing.TargetResolver<any, string> {
    isValid(target: string): boolean;
    resolve(target: string): string;
}
