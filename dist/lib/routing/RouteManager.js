"use strict";
/// <reference path="../contracts/RouteManager.ts" />
/// <reference path="../contracts/MiddlewareResolver.ts" />
/// <reference path="../contracts/TargetResolver.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />
/// <reference path="../definitions/IRouteBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const najs_facade_1 = require("najs-facade");
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
const RouteNotFoundError_1 = require("../errors/RouteNotFoundError");
class RouteManager extends najs_facade_1.Facade {
    constructor() {
        super();
        this.changed = false;
        this.builders = [];
        this.routes = [];
        this.routesNamed = {};
        this.changed = false;
        this.targetRegistered = {};
        this.targetResolvers = [];
        this.middlewareRegistered = {};
        this.middlewareResolvers = [];
    }
    getClassName() {
        return constants_1.ClassNames.RouteManager;
    }
    isChanged() {
        return this.changed;
    }
    getRoutes() {
        if (this.changed) {
            this.routes = lodash_1.flatten(this.builders.map(builder => builder.getRoutes()));
            this.routesNamed = this.routes.reduce((memo, item) => {
                if (item.name) {
                    // TODO: display warning message or error
                    // if (typeof memo[item.name] !== 'undefined' && this.options.duplicatedNameWarning) {
                    // Logger.warn('Duplicated named')
                    // }
                    memo[item.name] = item;
                }
                return memo;
            }, {});
            this.changed = false;
        }
        return this.routes;
    }
    addBuilder(builder) {
        this.changed = true;
        if (this.builders.length === 0) {
            this.builders.push(builder);
            return;
        }
        const lastBuilder = this.builders[this.builders.length - 1];
        if (lastBuilder.isContainer()) {
            lastBuilder.appendChild(builder);
            return;
        }
        this.builders.push(builder);
    }
    hasRoute(name) {
        return typeof this.routesNamed[name] !== 'undefined';
    }
    findOrFail(name) {
        this.getRoutes();
        if (!this.hasRoute(name)) {
            throw new RouteNotFoundError_1.RouteNotFoundError(name);
        }
        return this.routesNamed[name];
    }
    registerTargetResolver(resolver, name) {
        this.targetRegistered[name] = resolver;
        this.targetResolvers = Object.values(this.targetRegistered);
        return this;
    }
    registerMiddlewareResolver(resolver, name) {
        this.middlewareRegistered[name] = resolver;
        this.middlewareResolvers = Object.values(this.middlewareRegistered);
        return this;
    }
    getTargetResolvers() {
        return this.targetResolvers;
    }
    getMiddlewareResolvers() {
        return this.middlewareResolvers;
    }
}
RouteManager.className = constants_1.ClassNames.RouteManager;
exports.RouteManager = RouteManager;
najs_binding_1.register(RouteManager, constants_1.ClassNames.RouteManager);
