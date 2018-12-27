import 'jest'
import * as Sinon from 'sinon'
import { RouteBuilder } from '../../lib/routing/RouteBuilder'
import { HttpMethod } from '../../lib/routing/HttpMethod'
import { Route } from '../../lib/routing/Route'

describe('RouteBuilder', function() {
  describe('constructor()', function() {
    it('creates new Route instance, empty children and isGrouping = false', function() {
      const builder = new RouteBuilder()
      expect(builder['route']).toBeInstanceOf(Route)
      expect(builder['children']).toEqual([])
      expect(builder['isGrouping']).toEqual(false)
    })
  })

  describe('.getRoutes()', function() {
    it('returns an empty array if there is no children and current "route" returns undefined', function() {
      const builder = new RouteBuilder()
      expect(builder.getRoutes()).toEqual([])
    })

    it('returns an array with data from "route" if there is no children', function() {
      const builder = new RouteBuilder()
      const stub = Sinon.stub(builder['route'], 'getData')
      expect(stub.returns('anything'))
      expect(builder.getRoutes()).toEqual(['anything'])
    })

    it('calls "route".mergeParentData() then map children with it\'s .getRoutes() function', function() {
      const builder = new RouteBuilder()
      const child = new RouteBuilder()
      const parent: any = {}

      const mergeParentDataStub = Sinon.stub(builder['route'], 'mergeParentData')
      mergeParentDataStub.returns('anything')
      const stub = Sinon.stub(child, 'getRoutes')
      stub.returns(['a', 'b'])

      builder.appendChild(child)
      expect(builder.getRoutes(parent)).toEqual(['a', 'b'])
      expect(mergeParentDataStub.calledWith(parent)).toBe(true)
      expect(stub.calledWith(builder['route'])).toBe(true)
    })
  })

  describe('.isContainer()', function() {
    it('simply returns "isGrouping" property', function() {
      const builder = new RouteBuilder()
      expect(builder.isContainer()).toEqual(false)
      builder['isGrouping'] = true
      expect(builder.isContainer()).toEqual(true)
    })
  })

  describe('.appendChild()', function() {
    it('just appends given builder to "children" if there is no children yet', function() {
      const builder = new RouteBuilder()
      const child = new RouteBuilder()

      expect(builder['children']).toHaveLength(0)
      builder.appendChild(child)
      expect(builder['children']).toHaveLength(1)
    })

    it('uses lastChild.appendChild() of "children" if it is not empty and "lastChild" is container', function() {
      const builder = new RouteBuilder()
      const lastChild = new RouteBuilder()
      const greatChild = new RouteBuilder()

      expect(builder['children']).toHaveLength(0)
      builder.appendChild(lastChild)
      expect(builder['children']).toHaveLength(1)

      lastChild['isGrouping'] = true
      builder.appendChild(greatChild)
      expect(builder['children']).toHaveLength(1)
      expect(lastChild['children']).toHaveLength(1)
    })

    it('just appends given builder to "children"', function() {
      const builder = new RouteBuilder()
      const lastChild = new RouteBuilder()
      const greatChild = new RouteBuilder()

      expect(builder['children']).toHaveLength(0)
      builder.appendChild(lastChild)
      expect(builder['children']).toHaveLength(1)

      builder.appendChild(greatChild)
      expect(builder['children']).toHaveLength(2)
      expect(lastChild['children']).toHaveLength(0)
    })
  })

  describe('.middleware()', function() {
    it('flattens given list then passes them to "route" via .setMiddleware()', function() {
      const builder = new RouteBuilder()
      const spy = Sinon.spy(builder['route'], 'setMiddleware')

      expect(builder.middleware('a', ['b', 'c']) === builder).toBe(true)
      expect(spy.calledWith('a', 'b', 'c')).toBe(true)
    })
  })

  describe('.prefix()', function() {
    it('passes given argument to "route" via .setPrefix()', function() {
      const builder = new RouteBuilder()
      const spy = Sinon.spy(builder['route'], 'setPrefix')

      expect(builder.prefix('/') === builder).toBe(true)
      expect(spy.calledWith('/')).toBe(true)
    })
  })

  describe('.group()', function() {
    it('set the property "isGrouping" to to, then call callback then set the property to false again', function() {
      const builder = new RouteBuilder()
      const groupContainer = {
        group() {
          expect(builder.isContainer()).toBe(true)
        }
      }
      const spy = Sinon.spy(groupContainer, 'group')

      expect(builder.isContainer()).toBe(false)
      expect(spy.called).toBe(false)
      expect(builder.group(groupContainer.group) === builder).toBe(true)
      expect(spy.called).toBe(true)
      expect(builder.isContainer()).toBe(false)
    })
  })

  describe('.name()', function() {
    it('passes given argument to "route" via .setName()', function() {
      const builder = new RouteBuilder()
      const spy = Sinon.spy(builder['route'], 'setName')

      expect(builder.name('any') === builder).toBe(true)
      expect(spy.calledWith('any')).toBe(true)
    })
  })

  describe('.method()', function() {
    it('passes given argument to "route" via .setMethod(), .setPath(), .setTarget()', function() {
      const builder = new RouteBuilder()
      const setMethodSpy = Sinon.spy(builder['route'], 'setMethod')
      const setPathSpy = Sinon.spy(builder['route'], 'setPath')
      const setTargetSpy = Sinon.spy(builder['route'], 'setTarget')

      expect(builder.method('GET', 'path', 'target') === builder).toBe(true)
      expect(setMethodSpy.calledWith('GET')).toBe(true)
      expect(setPathSpy.calledWith('path')).toBe(true)
      expect(setTargetSpy.calledWith('target')).toBe(true)
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
        const builder = new RouteBuilder()
        const stub = Sinon.stub(builder, 'method')
        stub.returns('anything')

        expect(builder[func]('a')).toEqual('anything')
        expect(stub.calledWith(HTTP_VERBS[func], 'a')).toBe(true)
        stub.resetHistory()
        expect(builder[func]('a', 'b')).toEqual('anything')
        expect(stub.calledWith(HTTP_VERBS[func], 'a', 'b')).toBe(true)
      })
    })
  }
})
