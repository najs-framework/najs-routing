"use strict";
/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../contracts/RouteFactory.ts" />
/// <reference path="../contracts/MiddlewareResolver.ts" />
/// <reference path="../contracts/TargetResolver.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/HttpMethod.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const najs_facade_1 = require("najs-facade");
const RouteBuilder_1 = require("./RouteBuilder");
const HttpVerbs_1 = require("./mixin/HttpVerbs");
class RouteFactory extends najs_facade_1.Facade {
    constructor(manager) {
        super();
        this.manager = manager;
    }
    makeBuilder() {
        return new RouteBuilder_1.RouteBuilder();
    }
    validateMiddleware(middleware) {
        return this.validateByResolvers(middleware, this.manager.getMiddlewareResolvers());
    }
    validateTarget(target) {
        return this.validateByResolvers(target, this.manager.getTargetResolvers());
    }
    validateByResolvers(item, resolvers) {
        for (const resolver of resolvers) {
            if (!resolver.isValid(item)) {
                return false;
            }
        }
        return true;
    }
    middleware(...list) {
        const middlewareList = lodash_1.flatten(list).filter(middleware => {
            const isValid = this.validateMiddleware(middleware);
            if (!isValid) {
                // TODO: display warning message or error
                return false;
            }
            return true;
        });
        this.manager.addBuilder(this.makeBuilder().middleware(...middlewareList));
        return this;
    }
    prefix(prefix) {
        this.manager.addBuilder(this.makeBuilder().prefix(prefix));
        return this;
    }
    group(cb) {
        this.manager.addBuilder(this.makeBuilder().group(cb));
        return this;
    }
    name(name) {
        this.manager.addBuilder(this.makeBuilder().name(name));
        return this;
    }
    method(method, path, target) {
        if (!this.validateTarget(target)) {
            // TODO: display warning message or error
            return this;
        }
        this.manager.addBuilder(this.makeBuilder().method(method, path, target));
        return this;
    }
}
exports.RouteFactory = RouteFactory;
Object.assign(RouteFactory.prototype, HttpVerbs_1.HttpVerbs);
