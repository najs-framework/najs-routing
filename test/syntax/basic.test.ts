import 'jest'
import { FacadeContainer } from 'najs-facade'
import { NajsRouting } from '../../lib'
import { MiddlewareDummyResolver } from './resolvers/MiddlewareDummyResolver'
import { TargetDummyResolver } from './resolvers/TargetDummyResolver'

class Container extends FacadeContainer {}
const container = new Container()
const [RouteManager, Route] = NajsRouting.make(container)

RouteManager.registerMiddlewareResolver(new MiddlewareDummyResolver(), 'dummy')
RouteManager.registerTargetResolver(new TargetDummyResolver(), 'dummy')

describe('Basic syntax test', function() {
  it('should work with ".middleware().prefix().method()"', function() {
    Route.middleware('test')
      .prefix('/api')
      .method('GET', '/test', 'target')

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
    ])
  })

  it('should work with ".prefix().method().middleware()"', function() {
    Route.prefix('/api')
      .method('GET', '/test', 'target')
      .middleware('test')

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
  })
})
