"use strict";
/// <reference path="../../../lib/contracts/MiddlewareResolver.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class MiddlewareDummyResolver {
    isValid(middleware) {
        return true;
    }
    resolve(middleware) {
        return middleware + '-resolved';
    }
}
exports.MiddlewareDummyResolver = MiddlewareDummyResolver;
