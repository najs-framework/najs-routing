"use strict";
/// <reference path="../../definitions/Grammar.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const HttpMethod_1 = require("../HttpMethod");
exports.HttpVerbs = {
    all(path, target) {
        return this.method.apply(this, ['all'].concat(Array.from(arguments)));
    },
    checkout(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.CHECKOUT].concat(Array.from(arguments)));
    },
    copy(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.COPY].concat(Array.from(arguments)));
    },
    delete(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.DELETE].concat(Array.from(arguments)));
    },
    get(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.GET].concat(Array.from(arguments)));
    },
    head(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.HEAD].concat(Array.from(arguments)));
    },
    lock(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.LOCK].concat(Array.from(arguments)));
    },
    merge(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.MERGE].concat(Array.from(arguments)));
    },
    mkactivity(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.MKACTIVITY].concat(Array.from(arguments)));
    },
    mkcol(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.MKCOL].concat(Array.from(arguments)));
    },
    move(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.MOVE].concat(Array.from(arguments)));
    },
    msearch(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.M_SEARCH].concat(Array.from(arguments)));
    },
    notify(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.NOTIFY].concat(Array.from(arguments)));
    },
    options(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.OPTIONS].concat(Array.from(arguments)));
    },
    patch(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.PATCH].concat(Array.from(arguments)));
    },
    post(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.POST].concat(Array.from(arguments)));
    },
    purge(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.PURGE].concat(Array.from(arguments)));
    },
    put(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.PUT].concat(Array.from(arguments)));
    },
    report(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.REPORT].concat(Array.from(arguments)));
    },
    search(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.SEARCH].concat(Array.from(arguments)));
    },
    subscribe(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.SUBSCRIBE].concat(Array.from(arguments)));
    },
    trace(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.TRACE].concat(Array.from(arguments)));
    },
    unlock(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.UNLOCK].concat(Array.from(arguments)));
    },
    unsubscribe(path, target) {
        return this.method.apply(this, [HttpMethod_1.HttpMethod.UNSUBSCRIBE].concat(Array.from(arguments)));
    }
};
