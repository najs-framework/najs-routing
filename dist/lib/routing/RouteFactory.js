"use strict";
/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../contracts/RouteFactory.ts" />
/// <reference path="../contracts/MiddlewareResolver.ts" />
/// <reference path="../contracts/TargetResolver.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/HttpMethod.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_facade_1 = require("najs-facade");
const najs_binding_1 = require("najs-binding");
const RouteBuilder_1 = require("./RouteBuilder");
const HttpVerbs_1 = require("./mixin/HttpVerbs");
const constants_1 = require("../constants");
class RouteFactory extends najs_facade_1.Facade {
    constructor(manager) {
        super();
        this.manager = manager;
    }
    getClassName() {
        return constants_1.ClassNames.RouteFactory;
    }
    makeBuilder() {
        return new RouteBuilder_1.RouteBuilder(this.manager);
    }
    usingBuilder(builder) {
        this.manager.addBuilder(builder);
        return builder;
    }
    middleware(...list) {
        return this.usingBuilder(this.makeBuilder().middleware(...list));
    }
    prefix(prefix) {
        return this.usingBuilder(this.makeBuilder().prefix(prefix));
    }
    group(cb) {
        return this.usingBuilder(this.makeBuilder().group(cb));
    }
    name(name) {
        return this.usingBuilder(this.makeBuilder().name(name));
    }
    method(method, path, target) {
        return this.usingBuilder(this.makeBuilder().method(method, path, target));
    }
}
RouteFactory.className = constants_1.ClassNames.RouteFactory;
exports.RouteFactory = RouteFactory;
Object.assign(RouteFactory.prototype, HttpVerbs_1.HttpVerbs);
najs_binding_1.register(RouteFactory, constants_1.ClassNames.RouteFactory);
