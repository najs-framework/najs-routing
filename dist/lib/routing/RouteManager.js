"use strict";
/// <reference path="../contracts/MiddlewareResolver.ts" />
/// <reference path="../contracts/TargetResolver.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_facade_1 = require("najs-facade");
class RouteManager extends najs_facade_1.Facade {
    getRoutes() {
        return [];
    }
    hasRoute(name) {
        return false;
    }
    findOrFail(name) {
        return {};
    }
    addBuilder(builder) { }
    registerTargetResolver(resolver, name) { }
    registerMiddlewareResolver(resolver, name) { }
    getTargetResolvers() {
        return [];
    }
    getMiddlewareResolvers() {
        return [];
    }
}
exports.RouteManager = RouteManager;
