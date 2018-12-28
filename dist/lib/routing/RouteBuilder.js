"use strict";
/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../definitions/Grammar.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Route_1 = require("./Route");
const HttpVerbs_1 = require("./mixin/HttpVerbs");
class RouteBuilder {
    constructor(manager) {
        this.manager = manager;
        this.route = new Route_1.Route();
        this.children = [];
        this.isGrouping = false;
    }
    validateMiddleware(middleware) {
        return this.validateByResolvers(middleware, this.manager.getMiddlewareResolvers());
    }
    validateTarget(target) {
        return this.validateByResolvers(target, this.manager.getTargetResolvers());
    }
    validateByResolvers(item, resolvers) {
        if (resolvers.length === 0) {
            return false;
        }
        for (const resolver of resolvers) {
            if (resolver.isValid(item)) {
                return true;
            }
        }
        return false;
    }
    getRoutes(parent) {
        if (this.children.length === 0) {
            const data = this.route.getData(parent);
            return data ? [data] : [];
        }
        this.route.mergeParentData(parent);
        const result = this.children.map(item => {
            return item.getRoutes(this.route);
        });
        return lodash_1.flatten(result);
    }
    isContainer() {
        return this.isGrouping;
    }
    appendChild(builder) {
        if (this.children.length === 0) {
            this.children.push(builder);
            return;
        }
        const lastChild = this.children[this.children.length - 1];
        if (lastChild.isContainer()) {
            lastChild.appendChild(builder);
            return;
        }
        this.children.push(builder);
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
        this.route.setMiddleware(...middlewareList);
        return this;
    }
    prefix(prefix) {
        this.route.setPrefix(prefix);
        return this;
    }
    group(cb) {
        this.isGrouping = true;
        cb.call(undefined);
        this.isGrouping = false;
        return this;
    }
    name(name) {
        this.route.setName(name);
        return this;
    }
    method(method, path, target) {
        this.route.setMethod(method).setPath(path);
        if (!this.validateTarget(target)) {
            // TODO: display warning message or error
            return this;
        }
        this.route.setTarget(target);
        return this;
    }
}
exports.RouteBuilder = RouteBuilder;
Object.assign(RouteBuilder.prototype, HttpVerbs_1.HttpVerbs);
