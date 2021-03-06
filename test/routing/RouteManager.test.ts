import 'jest'
import * as Sinon from 'sinon'
import { Facade } from 'najs-facade'
import { RouteManager } from '../../lib/routing/RouteManager'
import { RouteNotFoundError } from '../../lib/errors/RouteNotFoundError'
import { RouteBuilder } from '../../lib/routing/RouteBuilder'

describe('RouteManager', function() {
  it('extends Facade, implements IAutoload under name "NajsRouting.RouteManager"', function() {
    const manager = new RouteManager()
    expect(manager).toBeInstanceOf(Facade)
    expect(manager.getClassName()).toEqual('NajsRouting.RouteManager')
  })

  describe('constructor()', function() {
    it('extends Facade, init "routes", "builders" to empty array and "routesNamed" to empty object', function() {
      const manager = new RouteManager()
      expect(manager).toBeInstanceOf(Facade)
      expect(manager['builders']).toHaveLength(0)
      expect(manager['routes']).toHaveLength(0)
      expect(manager['routesNamed']).toEqual({})
      expect(manager['changed']).toBe(false)
    })
  })

  describe('.isChanged()', function() {
    it('simply the getter of "changed" property', function() {
      const manager = new RouteManager()
      expect(manager.isChanged()).toBe(false)
      manager['changed'] = true
      expect(manager.isChanged()).toBe(true)
    })
  })

  describe('.getRoutes()', function() {
    it('does nothing, returns "routes" if "changed" is false', function() {
      const manager = new RouteManager()
      const routes: any = {}
      manager['routes'] = routes
      expect(manager.getRoutes() === routes).toBe(true)
    })

    it('loops all "builders" then map by builder.getRoutes(), then flatten result', function() {
      const manager = new RouteManager()
      const builderA = new RouteBuilder(manager)
      const builderB = new RouteBuilder(manager)

      const stubA = Sinon.stub(builderA, 'getRoutes')
      stubA.returns({ name: 'a' })

      const stubB = Sinon.stub(builderB, 'getRoutes')
      stubB.returns({ name: 'b' })

      manager.addBuilder(builderA)
      manager.addBuilder(builderB)
      expect(manager.getRoutes()).toEqual([{ name: 'a' }, { name: 'b' }])
    })

    it('also build the "routesNamed" by reduce "routes" with name', function() {
      const manager = new RouteManager()
      const builderA = new RouteBuilder(manager)
      const builderB = new RouteBuilder(manager)
      const builderC = new RouteBuilder(manager)

      const a = { name: 'a' }
      const b = { name: 'b' }
      const c = {}
      const stubA = Sinon.stub(builderA, 'getRoutes')
      stubA.returns(a)

      const stubB = Sinon.stub(builderB, 'getRoutes')
      stubB.returns(b)

      const stubC = Sinon.stub(builderC, 'getRoutes')
      stubC.returns(c)

      manager.addBuilder(builderA)
      manager.addBuilder(builderB)
      manager.addBuilder(builderC)
      expect(manager.getRoutes()).toEqual([a, b, c])
      expect(manager['routesNamed']).toEqual({ a: a, b: b })
    })
  })

  describe('.addBuilder()', function() {
    it('simply add the given builder to "builders" property if it empty, then set "changed" to true', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      manager.addBuilder(builder)
      expect(manager['builders']).toEqual([builder])
      expect(manager.isChanged()).toBe(true)
    })

    it('check the last builder is container or not, if yes it calls lastBuilder.appendChild()', function() {
      const manager = new RouteManager()
      const lastBuilder = new RouteBuilder(manager)
      lastBuilder['isGrouping'] = true
      const builder = new RouteBuilder(manager)
      const spy = Sinon.spy(lastBuilder, 'appendChild')

      manager.addBuilder(lastBuilder)
      manager.addBuilder(builder)
      expect(spy.calledWith(builder)).toBe(true)
      expect(manager['builders']).toEqual([lastBuilder])
      expect(manager.isChanged()).toBe(true)
    })

    it('check the last builder is container or not, if no it simply add builder to "builders" property', function() {
      const manager = new RouteManager()
      const lastBuilder = new RouteBuilder(manager)
      lastBuilder['isGrouping'] = false
      const builder = new RouteBuilder(manager)
      const spy = Sinon.spy(lastBuilder, 'appendChild')

      manager.addBuilder(lastBuilder)
      manager.addBuilder(builder)
      expect(spy.calledWith(builder)).toBe(false)
      expect(manager['builders']).toEqual([lastBuilder, builder])
      expect(manager.isChanged()).toBe(true)
    })
  })

  describe('.hasRoute()', function() {
    it('returns true if there is a key in "routesNamed" property', function() {
      const manager = new RouteManager()
      expect(manager.hasRoute('test')).toEqual(false)
      manager['routesNamed'] = { test: 'any' } as any
      expect(manager.hasRoute('test')).toEqual(true)
    })
  })

  describe('.findOrFail()', function() {
    it('calls .getRoutes(), then throws an RouteNotFound error if the route is not found', function() {
      const manager = new RouteManager()
      const spy = Sinon.spy(manager, 'getRoutes')
      const stub = Sinon.stub(manager, 'hasRoute')
      stub.returns(false)
      try {
        manager.findOrFail('test')
      } catch (error) {
        expect(spy.called).toBe(true)
        expect(error).toBeInstanceOf(RouteNotFoundError)
        return
      }
      expect('should not reach here').toEqual('hm')
    })

    it('calls .getRoutes(), then returns value in "routesNamed" if the route found', function() {
      const manager = new RouteManager()
      manager['routesNamed'] = { test: 'any' } as any
      const stub = Sinon.stub(manager, 'getRoutes')
      try {
        expect(manager.findOrFail('test')).toEqual('any')
        expect(stub.called).toBe(true)
      } catch (error) {
        expect('should not reach here').toEqual('hm')
        return
      }
    })
  })

  describe('.registerTargetResolver()', function() {
    it('assigned resolver to "targetRegistered" by given name, then update "targetResolvers" property', function() {
      const resolver: any = {}
      const manager = new RouteManager()
      manager.registerTargetResolver(resolver, 'test')
      expect(manager['targetRegistered']).toEqual({ test: resolver })
      expect(manager['targetResolvers']).toEqual([resolver])
    })
  })

  describe('.registerMiddlewareResolver()', function() {
    it('assigned resolver to "middlewareRegistered" by given name, then update "middlewareResolvers" property', function() {
      const resolver: any = {}
      const manager = new RouteManager()
      manager.registerMiddlewareResolver(resolver, 'test')
      expect(manager['middlewareRegistered']).toEqual({ test: resolver })
      expect(manager['middlewareResolvers']).toEqual([resolver])
    })
  })

  describe('.getTargetResolvers()', function() {
    it('simply a getter of "targetResolvers" property', function() {
      const resolvers: any = {}
      const manager = new RouteManager()
      manager['targetResolvers'] = resolvers
      expect(manager.getTargetResolvers() === resolvers).toBe(true)
    })
  })

  describe('.getMiddlewareResolvers()', function() {
    it('simply a getter of "middlewareResolvers" property', function() {
      const resolvers: any = {}
      const manager = new RouteManager()
      manager['middlewareResolvers'] = resolvers
      expect(manager.getMiddlewareResolvers() === resolvers).toBe(true)
    })
  })
})
