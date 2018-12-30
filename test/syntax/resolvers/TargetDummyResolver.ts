/// <reference path="../../../lib/contracts/TargetResolver.ts" />

export class TargetDummyResolver implements NajsFramework.Contracts.Routing.TargetResolver<any, string> {
  isValid(target: string) {
    return true
  }

  resolve(target: string) {
    return target + '-resolved'
  }
}
