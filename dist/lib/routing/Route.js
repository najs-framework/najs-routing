"use strict";
/// <reference path="../definitions/HttpMethod.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor() {
        this.prefix = '';
        this.middleware = [];
        this.isMerged = false;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    setMiddleware(...middleware) {
        this.middleware = Array.from(new Set(this.middleware.concat(middleware)));
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    setArguments(args) {
        this.arguments = Array.from(args);
        return this;
    }
    isValid() {
        return (typeof this.method !== 'undefined' &&
            typeof this.path !== 'undefined' &&
            typeof this.target !== 'undefined' &&
            this.path !== '');
    }
    mergeParentData(parent) {
        if (typeof parent === 'undefined') {
            return;
        }
        if (!this.isMerged) {
            this.prefix = this.mergePrefix(parent.prefix, this.prefix);
            this.middleware = Array.from(new Set(parent.middleware.concat(this.middleware)));
        }
        this.isMerged = true;
    }
    mergePrefix(lhs, rhs, separator = '/') {
        if (lhs === '' || rhs === '') {
            return lhs + rhs;
        }
        if (!lhs.endsWith(separator) && !rhs.startsWith(separator)) {
            return lhs + separator + rhs;
        }
        if (lhs.endsWith(separator) && rhs.startsWith(separator)) {
            return lhs + rhs.substr(1);
        }
        return lhs + rhs;
    }
    getData(parent) {
        if (!this.isValid()) {
            return undefined;
        }
        this.mergeParentData(parent);
        return {
            type: this.type,
            name: this.name,
            method: this.method,
            path: this.path,
            prefix: this.prefix,
            middleware: this.middleware,
            target: this.target,
            arguments: this.arguments
        };
    }
}
exports.Route = Route;
