"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const najs_facade_1 = require("najs-facade");
const lib_1 = require("../../lib");
const MiddlewareDummyResolver_1 = require("./resolvers/MiddlewareDummyResolver");
const TargetDummyResolver_1 = require("./resolvers/TargetDummyResolver");
class Container extends najs_facade_1.FacadeContainer {
}
const container = new Container();
const [RouteManager, Route] = lib_1.NajsRouting.make(container);
RouteManager.registerMiddlewareResolver(new MiddlewareDummyResolver_1.MiddlewareDummyResolver(), 'dummy');
RouteManager.registerTargetResolver(new TargetDummyResolver_1.TargetDummyResolver(), 'dummy');
describe('Basic syntax test', function () {
    it('should work with ".middleware().prefix().method()"', function () {
        Route.middleware('test')
            .prefix('/api')
            .method('GET', '/test', 'target');
        expect(RouteManager.getRoutes()).toEqual([
            {
                type: undefined,
                name: undefined,
                method: 'GET',
                path: '/test',
                prefix: '/api',
                middleware: ['test'],
                target: 'target',
                arguments: ['GET', '/test', 'target'],
                resolvedMiddleware: ['test-resolved'],
                resolvedTarget: 'target-resolved'
            }
        ]);
    });
    it('should work with ".prefix().method().middleware()"', function () {
        Route.prefix('/api')
            .method('GET', '/test', 'target')
            .middleware('test');
        // expect(RouteManager.getRoutes()).toEqual([
        //   {
        //     type: undefined,
        //     name: undefined,
        //     method: 'GET',
        //     path: '/test',
        //     prefix: '/api',
        //     middleware: ['test'],
        //     target: 'target',
        //     arguments: ['GET', '/test', 'target'],
        //     resolvedMiddleware: ['test-resolved'],
        //     resolvedTarget: 'target-resolved'
        //   }
        // ])
    });
});
