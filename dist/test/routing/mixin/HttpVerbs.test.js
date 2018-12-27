"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const HttpMethod_1 = require("../../../lib/routing/HttpMethod");
const HttpVerbs_1 = require("../../../lib/routing/mixin/HttpVerbs");
describe('HttpVerbs', function () {
    const HTTP_VERBS = {
        all: 'all',
        checkout: HttpMethod_1.HttpMethod.CHECKOUT,
        copy: HttpMethod_1.HttpMethod.COPY,
        delete: HttpMethod_1.HttpMethod.DELETE,
        get: HttpMethod_1.HttpMethod.GET,
        head: HttpMethod_1.HttpMethod.HEAD,
        lock: HttpMethod_1.HttpMethod.LOCK,
        merge: HttpMethod_1.HttpMethod.MERGE,
        mkactivity: HttpMethod_1.HttpMethod.MKACTIVITY,
        mkcol: HttpMethod_1.HttpMethod.MKCOL,
        move: HttpMethod_1.HttpMethod.MOVE,
        msearch: HttpMethod_1.HttpMethod.M_SEARCH,
        notify: HttpMethod_1.HttpMethod.NOTIFY,
        options: HttpMethod_1.HttpMethod.OPTIONS,
        patch: HttpMethod_1.HttpMethod.PATCH,
        post: HttpMethod_1.HttpMethod.POST,
        purge: HttpMethod_1.HttpMethod.PURGE,
        put: HttpMethod_1.HttpMethod.PUT,
        report: HttpMethod_1.HttpMethod.REPORT,
        search: HttpMethod_1.HttpMethod.SEARCH,
        subscribe: HttpMethod_1.HttpMethod.SUBSCRIBE,
        trace: HttpMethod_1.HttpMethod.TRACE,
        unlock: HttpMethod_1.HttpMethod.UNLOCK,
        unsubscribe: HttpMethod_1.HttpMethod.UNSUBSCRIBE
    };
    for (const func in HTTP_VERBS) {
        describe(`.${func}()`, function () {
            it(`calls and returns .method() with "${HTTP_VERBS[func]}" and passes all arguments`, function () {
                const container = {
                    method() {
                        return 'anything';
                    }
                };
                const spy = Sinon.spy(container, 'method');
                expect(HttpVerbs_1.HttpVerbs[func].apply(container, ['a'])).toEqual('anything');
                expect(spy.calledWith(HTTP_VERBS[func], 'a')).toBe(true);
                spy.resetHistory();
                expect(HttpVerbs_1.HttpVerbs[func].apply(container, ['a', 'b'])).toEqual('anything');
                expect(spy.calledWith(HTTP_VERBS[func], 'a', 'b')).toBe(true);
            });
        });
    }
});
