"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const najs_facade_1 = require("najs-facade");
const HttpMethod_1 = require("../../lib/routing/HttpMethod");
const RouteManager_1 = require("../../lib/routing/RouteManager");
const RouteFactory_1 = require("../../lib/routing/RouteFactory");
describe('RouteFactory', function () {
    describe('constructor()', function () {
        it('extends Facade, needs RouteManager in params and assigns to "manager" property', function () {
            const manager = new RouteManager_1.RouteManager();
            const factory = new RouteFactory_1.RouteFactory(manager);
            expect(factory).toBeInstanceOf(najs_facade_1.Facade);
            expect(factory['manager'] === manager).toBe(true);
        });
    });
    describe('.makeBuilder()', function () {
        it('creates new RouteBuilder with current RouteManager', function () {
            const manager = new RouteManager_1.RouteManager();
            const factory = new RouteFactory_1.RouteFactory(manager);
            const builder = factory.makeBuilder();
            expect(builder['manager'] === manager).toBe(true);
        });
    });
    describe('.middleware()', function () {
        it('creates new RouteBuilder, pass given value by .middleware() then .addBuilder() to manager', function () {
            const manager = new RouteManager_1.RouteManager();
            const factory = new RouteFactory_1.RouteFactory(manager);
            const builder = {
                middleware() {
                    return this;
                }
            };
            const stub = Sinon.stub(factory, 'makeBuilder');
            stub.returns(builder);
            const spy = Sinon.spy(builder, 'middleware');
            expect(manager['builders']).toEqual([]);
            expect(factory.middleware('a', ['b', 'c']) === builder).toBe(true);
            expect(manager['builders']).toHaveLength(1);
            expect(spy.calledWith('a', ['b', 'c'])).toBe(true);
        });
    });
    describe('.prefix()', function () {
        it('creates new RouteBuilder, pass given value by .prefix() then .addBuilder() to manager', function () {
            const manager = new RouteManager_1.RouteManager();
            const factory = new RouteFactory_1.RouteFactory(manager);
            const builder = {
                prefix() {
                    return this;
                }
            };
            const stub = Sinon.stub(factory, 'makeBuilder');
            stub.returns(builder);
            const spy = Sinon.spy(builder, 'prefix');
            expect(manager['builders']).toEqual([]);
            expect(factory.prefix('test') === builder).toBe(true);
            expect(manager['builders']).toHaveLength(1);
            expect(spy.calledWith('test')).toBe(true);
        });
    });
    describe('.group()', function () {
        it('creates new RouteBuilder, pass given value by .group() then .addBuilder() to manager', function () {
            const manager = new RouteManager_1.RouteManager();
            const factory = new RouteFactory_1.RouteFactory(manager);
            const builder = {
                group() {
                    return this;
                }
            };
            const stub = Sinon.stub(factory, 'makeBuilder');
            stub.returns(builder);
            const spy = Sinon.spy(builder, 'group');
            const cb = () => { };
            expect(manager['builders']).toEqual([]);
            expect(factory.group(cb) === builder).toBe(true);
            expect(manager['builders']).toHaveLength(1);
            expect(spy.calledWith(cb)).toBe(true);
        });
    });
    describe('.name()', function () {
        it('creates new RouteBuilder, pass given value by .name() then .addBuilder() to manager', function () {
            const manager = new RouteManager_1.RouteManager();
            const factory = new RouteFactory_1.RouteFactory(manager);
            const builder = {
                name() {
                    return this;
                }
            };
            const stub = Sinon.stub(factory, 'makeBuilder');
            stub.returns(builder);
            const spy = Sinon.spy(builder, 'name');
            expect(manager['builders']).toEqual([]);
            expect(factory.name('test') === builder).toBe(true);
            expect(manager['builders']).toHaveLength(1);
            expect(spy.calledWith('test')).toBe(true);
        });
    });
    describe('.method()', function () {
        it('creates new RouteBuilder, pass given value by .method() then .addBuilder() to manager', function () {
            const manager = new RouteManager_1.RouteManager();
            const factory = new RouteFactory_1.RouteFactory(manager);
            const builder = {
                method() {
                    return this;
                }
            };
            const stub = Sinon.stub(factory, 'makeBuilder');
            stub.returns(builder);
            const spy = Sinon.spy(builder, 'method');
            expect(manager['builders']).toEqual([]);
            expect(factory.method('GET', '/', 'target') === builder).toBe(true);
            expect(manager['builders']).toHaveLength(1);
            expect(spy.calledWith('GET', '/', 'target')).toBe(true);
        });
    });
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
                const manager = new RouteManager_1.RouteManager();
                const factory = new RouteFactory_1.RouteFactory(manager);
                const stub = Sinon.stub(factory, 'method');
                stub.returns('anything');
                expect(factory[func]('a')).toEqual('anything');
                expect(stub.calledWith(HTTP_VERBS[func], 'a')).toBe(true);
                stub.resetHistory();
                expect(factory[func]('a', 'b')).toEqual('anything');
                expect(stub.calledWith(HTTP_VERBS[func], 'a', 'b')).toBe(true);
            });
        });
    }
});
