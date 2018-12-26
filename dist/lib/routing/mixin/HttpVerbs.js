"use strict";
/// <reference path="../../definitions/Grammar.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const HttpMethod_1 = require("../HttpMethod");
exports.HttpVerbs = {
    all(path, target) {
        return this.method('all', path, target);
    },
    checkout(path, target) {
        return this.method(HttpMethod_1.HttpMethod.CHECKOUT, path, target);
    },
    copy(path, target) {
        return this.method(HttpMethod_1.HttpMethod.COPY, path, target);
    },
    delete(path, target) {
        return this.method(HttpMethod_1.HttpMethod.DELETE, path, target);
    },
    get(path, target) {
        return this.method(HttpMethod_1.HttpMethod.GET, path, target);
    },
    head(path, target) {
        return this.method(HttpMethod_1.HttpMethod.HEAD, path, target);
    },
    lock(path, target) {
        return this.method(HttpMethod_1.HttpMethod.LOCK, path, target);
    },
    merge(path, target) {
        return this.method(HttpMethod_1.HttpMethod.MERGE, path, target);
    },
    mkactivity(path, target) {
        return this.method(HttpMethod_1.HttpMethod.MKACTIVITY, path, target);
    },
    mkcol(path, target) {
        return this.method(HttpMethod_1.HttpMethod.MKCOL, path, target);
    },
    move(path, target) {
        return this.method(HttpMethod_1.HttpMethod.MOVE, path, target);
    },
    msearch(path, target) {
        return this.method(HttpMethod_1.HttpMethod.M_SEARCH, path, target);
    },
    notify(path, target) {
        return this.method(HttpMethod_1.HttpMethod.NOTIFY, path, target);
    },
    options(path, target) {
        return this.method(HttpMethod_1.HttpMethod.OPTIONS, path, target);
    },
    patch(path, target) {
        return this.method(HttpMethod_1.HttpMethod.PATCH, path, target);
    },
    post(path, target) {
        return this.method(HttpMethod_1.HttpMethod.POST, path, target);
    },
    purge(path, target) {
        return this.method(HttpMethod_1.HttpMethod.PURGE, path, target);
    },
    put(path, target) {
        return this.method(HttpMethod_1.HttpMethod.PUT, path, target);
    },
    report(path, target) {
        return this.method(HttpMethod_1.HttpMethod.REPORT, path, target);
    },
    search(path, target) {
        return this.method(HttpMethod_1.HttpMethod.SEARCH, path, target);
    },
    subscribe(path, target) {
        return this.method(HttpMethod_1.HttpMethod.SUBSCRIBE, path, target);
    },
    trace(path, target) {
        return this.method(HttpMethod_1.HttpMethod.TRACE, path, target);
    },
    unlock(path, target) {
        return this.method(HttpMethod_1.HttpMethod.UNLOCK, path, target);
    },
    unsubscribe(path, target) {
        return this.method(HttpMethod_1.HttpMethod.UNSUBSCRIBE, path, target);
    }
};
