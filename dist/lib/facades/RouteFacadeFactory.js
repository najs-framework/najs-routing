"use strict";
/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../contracts/RouteFactory.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_facade_1 = require("najs-facade");
const najs_binding_1 = require("najs-binding");
class RouteFacadeFactory {
    static make(container, routeManagerClassName, routeFactoryClassName) {
        return najs_facade_1.Facade.create(container, 'route', function () {
            return najs_binding_1.make(routeFactoryClassName, [najs_binding_1.make(routeManagerClassName)]);
        });
    }
}
exports.RouteFacadeFactory = RouteFacadeFactory;
