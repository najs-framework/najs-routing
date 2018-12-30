"use strict";
/// <reference path="../../../lib/contracts/TargetResolver.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class TargetDummyResolver {
    isValid(target) {
        return true;
    }
    resolve(target, route) {
        return target + '-resolved';
    }
}
exports.TargetDummyResolver = TargetDummyResolver;
