"use strict";
/// <reference path="../definitions/Grammar.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Route_1 = require("./Route");
const HttpVerbs_1 = require("./mixin/HttpVerbs");
class RouteBuilder {
    constructor() {
        this.route = new Route_1.Route();
        this.children = [];
        this.grouped = false;
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
        return this.grouped;
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
        const middleware = lodash_1.flatten(list);
        this.route.setMiddleware(...middleware);
        return this;
    }
    prefix(prefix) {
        this.route.setPrefix(prefix);
        return this;
    }
    group(cb) {
        this.grouped = true;
        cb.call(undefined);
        this.grouped = false;
        return this;
    }
    name(name) {
        this.route.setName(name);
        return this;
    }
    method(method, path, target) {
        this.route
            .setMethod(method)
            .setPath(path)
            .setTarget(target);
        return this;
    }
}
exports.RouteBuilder = RouteBuilder;
Object.assign(RouteBuilder.prototype, HttpVerbs_1.HttpVerbs);
