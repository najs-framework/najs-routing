import 'jest'
import * as Sinon from 'sinon'
import { Facade } from 'najs-facade'
import { HttpMethod } from '../../lib/routing/HttpMethod'
import { RouteManager } from '../../lib/routing/RouteManager'
import { RouteFactory } from '../../lib/routing/RouteFactory'

describe('RouteFactory', function() {
  describe('constructor()', function() {
    it('extends Facade, needs RouteManager in params and assigns to "manager" property', function() {
      const manager = new RouteManager()
      const factory = new RouteFactory(manager)
      expect(factory).toBeInstanceOf(Facade)
      expect(factory['manager'] === manager).toBe(true)
    })
  })

  describe('.makeBuilder()', function() {
    it('creates new RouteBuilder with current RouteManager', function() {
      const manager = new RouteManager()
      const factory = new RouteFactory(manager)
      const builder = factory.makeBuilder()
      expect(builder['manager'] === manager).toBe(true)
    })
  })

  describe('.middleware()', function() {
    it('creates new RouteBuilder, pass given value by .middleware() then .addBuilder() to manager', function() {
      const manager = new RouteManager()
      const factory = new RouteFactory(manager)
      const builder: any = {
        middleware() {
          return this
        }
      }
      const stub = Sinon.stub(factory, 'makeBuilder')
      stub.returns(builder)
      const spy = Sinon.spy(builder, 'middleware')

      expect(manager['builders']).toEqual([])
      expect(factory.middleware('a', ['b', 'c']) === builder).toBe(true)
      expect(manager['builders']).toHaveLength(1)
      expect(spy.calledWith('a', ['b', 'c'])).toBe(true)
    })
  })

  describe('.prefix()', function() {
    it('creates new RouteBuilder, pass given value by .prefix() then .addBuilder() to manager', function() {
      const manager = new RouteManager()
      const factory = new RouteFactory(manager)
      const builder: any = {
        prefix() {
          return this
        }
      }
      const stub = Sinon.stub(factory, 'makeBuilder')
      stub.returns(builder)
      const spy = Sinon.spy(builder, 'prefix')

      expect(manager['builders']).toEqual([])
      expect(factory.prefix('test') === builder).toBe(true)
      expect(manager['builders']).toHaveLength(1)
      expect(spy.calledWith('test')).toBe(true)
    })
  })

  describe('.group()', function() {
    it('creates new RouteBuilder, pass given value by .group() then .addBuilder() to manager', function() {
      const manager = new RouteManager()
      const factory = new RouteFactory(manager)
      const builder: any = {
        group() {
          return this
        }
      }
      const stub = Sinon.stub(factory, 'makeBuilder')
      stub.returns(builder)
      const spy = Sinon.spy(builder, 'group')
      const cb = () => {}

      expect(manager['builders']).toEqual([])
      expect(factory.group(cb) === builder).toBe(true)
      expect(manager['builders']).toHaveLength(1)
      expect(spy.calledWith(cb)).toBe(true)
    })
  })

  describe('.name()', function() {
    it('creates new RouteBuilder, pass given value by .name() then .addBuilder() to manager', function() {
      const manager = new RouteManager()
      const factory = new RouteFactory(manager)
      const builder: any = {
        name() {
          return this
        }
      }
      const stub = Sinon.stub(factory, 'makeBuilder')
      stub.returns(builder)
      const spy = Sinon.spy(builder, 'name')

      expect(manager['builders']).toEqual([])
      expect(factory.name('test') === builder).toBe(true)
      expect(manager['builders']).toHaveLength(1)
      expect(spy.calledWith('test')).toBe(true)
    })
  })

  describe('.method()', function() {
    it('creates new RouteBuilder, pass given value by .method() then .addBuilder() to manager', function() {
      const manager = new RouteManager()
      const factory = new RouteFactory(manager)
      const builder: any = {
        method() {
          return this
        }
      }
      const stub = Sinon.stub(factory, 'makeBuilder')
      stub.returns(builder)
      const spy = Sinon.spy(builder, 'method')

      expect(manager['builders']).toEqual([])
      expect(factory.method('GET', '/', 'target') === builder).toBe(true)
      expect(manager['builders']).toHaveLength(1)
      expect(spy.calledWith('GET', '/', 'target')).toBe(true)
    })
  })

  const HTTP_VERBS = {
    all: 'all',
    checkout: HttpMethod.CHECKOUT,
    copy: HttpMethod.COPY,
    delete: HttpMethod.DELETE,
    get: HttpMethod.GET,
    head: HttpMethod.HEAD,
    lock: HttpMethod.LOCK,
    merge: HttpMethod.MERGE,
    mkactivity: HttpMethod.MKACTIVITY,
    mkcol: HttpMethod.MKCOL,
    move: HttpMethod.MOVE,
    msearch: HttpMethod.M_SEARCH,
    notify: HttpMethod.NOTIFY,
    options: HttpMethod.OPTIONS,
    patch: HttpMethod.PATCH,
    post: HttpMethod.POST,
    purge: HttpMethod.PURGE,
    put: HttpMethod.PUT,
    report: HttpMethod.REPORT,
    search: HttpMethod.SEARCH,
    subscribe: HttpMethod.SUBSCRIBE,
    trace: HttpMethod.TRACE,
    unlock: HttpMethod.UNLOCK,
    unsubscribe: HttpMethod.UNSUBSCRIBE
  }

  for (const func in HTTP_VERBS) {
    describe(`.${func}()`, function() {
      it(`calls and returns .method() with "${HTTP_VERBS[func]}" and passes all arguments`, function() {
        const manager = new RouteManager()
        const factory = new RouteFactory(manager)
        const stub = Sinon.stub(factory, 'method')
        stub.returns('anything')

        expect(factory[func]('a')).toEqual('anything')
        expect(stub.calledWith(HTTP_VERBS[func], 'a')).toBe(true)
        stub.resetHistory()
        expect(factory[func]('a', 'b')).toEqual('anything')
        expect(stub.calledWith(HTTP_VERBS[func], 'a', 'b')).toBe(true)
      })
    })
  }
})
