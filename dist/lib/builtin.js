"use strict";
/// <reference path="./contracts/RouteManager.ts" />
/// <reference path="./contracts/RouteFactory.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("./routing/Route");
const RouteBuilder_1 = require("./routing/RouteBuilder");
const RouteManager_1 = require("./routing/RouteManager");
const RouteFactory_1 = require("./routing/RouteFactory");
const NajsBinding = require("najs-binding");
const najs_facade_1 = require("najs-facade");
var NajsRouting;
(function (NajsRouting) {
    function make(container, routeFactoryClassName, routeManagerClassName) {
        const manager = NajsBinding.make(routeManagerClassName || RouteManager_1.RouteManager.className);
        const factory = najs_facade_1.Facade.create(container, 'route', function () {
            return NajsBinding.make(routeFactoryClassName || RouteFactory_1.RouteFactory.className, [manager]);
        });
        return [manager, factory];
    }
    NajsRouting.make = make;
    NajsRouting.Route = Route_1.Route;
    NajsRouting.RouteBuilder = RouteBuilder_1.RouteBuilder;
    NajsRouting.RouteManager = RouteManager_1.RouteManager;
    NajsRouting.RouteFactory = RouteFactory_1.RouteFactory;
})(NajsRouting = exports.NajsRouting || (exports.NajsRouting = {}));
