/// <reference path="../../../lib/contracts/MiddlewareResolver.ts" />

export class MiddlewareDummyResolver implements NajsFramework.Contracts.Routing.MiddlewareResolver<any, string> {
  isValid(middleware: string) {
    return true
  }

  resolve(middleware: string, route: any) {
    return middleware + '-resolved'
  }
}
