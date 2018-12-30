import 'jest'
import * as Sinon from 'sinon'
import { RouteBuilder } from '../../lib/routing/RouteBuilder'
import { HttpMethod } from '../../lib/routing/HttpMethod'
import { Route } from '../../lib/routing/Route'
import { RouteManager } from '../../lib/routing/RouteManager'

describe('RouteBuilder', function() {
  describe('constructor()', function() {
    it('creates new Route instance, empty children and isGrouping = false', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      expect(builder['manager'] === manager).toBe(true)
      expect(builder['route']).toBeInstanceOf(Route)
      expect(builder['children']).toEqual([])
      expect(builder['isGrouping']).toEqual(false)
    })
  })

  describe('.validateMiddleware()', function() {
    it('returns false if there is no resolvers provided by RouteManager', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      expect(builder.validateMiddleware('any')).toBe(false)
    })

    it('loops middlewareResolvers provided by RouteManager then returns true if .isValid() of any resolver returns true', function() {
      const resolverA: any = {
        isValid(name: string) {
          return name === 'a'
        }
      }

      const resolverB: any = {
        isValid(name: string) {
          return name === 'b'
        }
      }

      const resolverC: any = {
        isValid(name: string) {
          return name === 'c'
        }
      }

      const manager = new RouteManager()
      manager
        .registerMiddlewareResolver(resolverA, 'a')
        .registerMiddlewareResolver(resolverB, 'b')
        .registerMiddlewareResolver(resolverC, 'c')
      const builder = new RouteBuilder(manager)
      expect(builder.validateMiddleware('a')).toBe(true)
      expect(builder.validateMiddleware('b')).toBe(true)
      expect(builder.validateMiddleware('any')).toBe(false)
    })
  })

  describe('.validateTarget()', function() {
    it('returns false if there is no resolvers provided by RouteManager', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      expect(builder.validateTarget('any')).toBe(false)
    })

    it('loops middlewareResolvers provided by RouteManager then returns true if .isValid() of any resolver returns true', function() {
      const resolverA: any = {
        isValid(name: string) {
          return name === 'a'
        }
      }

      const resolverB: any = {
        isValid(name: string) {
          return name === 'b'
        }
      }

      const resolverC: any = {
        isValid(name: string) {
          return name === 'c'
        }
      }

      const manager = new RouteManager()
      manager
        .registerTargetResolver(resolverA, 'a')
        .registerTargetResolver(resolverB, 'b')
        .registerTargetResolver(resolverC, 'c')
      const builder = new RouteBuilder(manager)
      expect(builder.validateTarget('a')).toBe(true)
      expect(builder.validateTarget('b')).toBe(true)
      expect(builder.validateTarget('any')).toBe(false)
    })
  })

  describe('.resolveMiddleware()', function() {
    it('returns undefined if there is no resolvers provided by RouteManager', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      expect(builder.resolveMiddleware('any')).toBeUndefined()
    })

    it('loops middlewareResolvers provided by RouteManager then returns .resolve() if .isValid() of any resolver returns true', function() {
      const resolverA: any = {
        isValid(name: string) {
          return name === 'a'
        },
        resolve(name: string) {
          return name + '-resolved'
        }
      }

      const resolverB: any = {
        isValid(name: string) {
          return name === 'b'
        },
        resolve(name: string) {
          return name + '-resolved'
        }
      }

      const resolverC: any = {
        isValid(name: string) {
          return name === 'c'
        },
        resolve(name: string) {
          return name + '-resolved'
        }
      }

      const manager = new RouteManager()
      manager
        .registerMiddlewareResolver(resolverA, 'a')
        .registerMiddlewareResolver(resolverB, 'b')
        .registerMiddlewareResolver(resolverC, 'c')
      const builder = new RouteBuilder(manager)
      expect(builder.resolveMiddleware('a')).toEqual('a-resolved')
      expect(builder.resolveMiddleware('b')).toEqual('b-resolved')
      expect(builder.resolveMiddleware('any')).toBeUndefined()
    })
  })

  describe('.resolveTarget()', function() {
    it('returns undefined if there is no resolvers provided by RouteManager', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      expect(builder.resolveTarget('any')).toBeUndefined()
    })

    it('loops targetResolvers provided by RouteManager then returns .resolve() if .isValid() of any resolver returns true', function() {
      const resolverA: any = {
        isValid(name: string) {
          return name === 'a'
        },
        resolve(name: string) {
          return name + '-resolved'
        }
      }

      const resolverB: any = {
        isValid(name: string) {
          return name === 'b'
        },
        resolve(name: string) {
          return name + '-resolved'
        }
      }

      const resolverC: any = {
        isValid(name: string) {
          return name === 'c'
        },
        resolve(name: string) {
          return name + '-resolved'
        }
      }

      const manager = new RouteManager()
      manager
        .registerTargetResolver(resolverA, 'a')
        .registerTargetResolver(resolverB, 'b')
        .registerTargetResolver(resolverC, 'c')
      const builder = new RouteBuilder(manager)
      expect(builder.resolveTarget('a')).toEqual('a-resolved')
      expect(builder.resolveTarget('b')).toEqual('b-resolved')
      expect(builder.resolveTarget('any')).toBeUndefined()
    })
  })

  describe('.getRoutes()', function() {
    it('returns an empty array if there is no children and current "route" returns undefined', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      expect(builder.getRoutes()).toEqual([])
    })

    it('returns an array with data from "route" and resolvedMiddleware + resolvedTarget if there is no children', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const stub = Sinon.stub(builder['route'], 'getData')
      const routeRata = {
        middleware: ['a', 'b'],
        target: 'target'
      }
      const resolveMiddlewareStub = Sinon.stub(builder, 'resolveMiddleware')
      resolveMiddlewareStub.callsFake(function(item) {
        return item + '-resolved'
      })
      const resolveTargetStub = Sinon.stub(builder, 'resolveTarget')
      resolveTargetStub.callsFake(function(item) {
        return item + '-resolved'
      })

      expect(stub.returns(routeRata))
      expect(builder.getRoutes()).toEqual([
        {
          middleware: ['a', 'b'],
          target: 'target',
          resolvedMiddleware: ['a-resolved', 'b-resolved'],
          resolvedTarget: 'target-resolved'
        }
      ])
    })

    it('calls "route".mergeParentData() then map children with it\'s .getRoutes() function', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const child = new RouteBuilder(manager)
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
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      expect(builder.isContainer()).toEqual(false)
      builder['isGrouping'] = true
      expect(builder.isContainer()).toEqual(true)
    })
  })

  describe('.appendChild()', function() {
    it('just appends given builder to "children" if there is no children yet', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const child = new RouteBuilder(manager)

      expect(builder['children']).toHaveLength(0)
      builder.appendChild(child)
      expect(builder['children']).toHaveLength(1)
    })

    it('uses lastChild.appendChild() of "children" if it is not empty and "lastChild" is container', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const lastChild = new RouteBuilder(manager)
      const greatChild = new RouteBuilder(manager)

      expect(builder['children']).toHaveLength(0)
      builder.appendChild(lastChild)
      expect(builder['children']).toHaveLength(1)

      lastChild['isGrouping'] = true
      builder.appendChild(greatChild)
      expect(builder['children']).toHaveLength(1)
      expect(lastChild['children']).toHaveLength(1)
    })

    it('just appends given builder to "children"', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const lastChild = new RouteBuilder(manager)
      const greatChild = new RouteBuilder(manager)

      expect(builder['children']).toHaveLength(0)
      builder.appendChild(lastChild)
      expect(builder['children']).toHaveLength(1)

      builder.appendChild(greatChild)
      expect(builder['children']).toHaveLength(2)
      expect(lastChild['children']).toHaveLength(0)
    })
  })

  describe('.middleware()', function() {
    it('flattens given list then validate by .validateMiddleware() and passes valid ones to "route" via .setMiddleware()', function() {
      const resolverA: any = {
        isValid(name: string) {
          return name === 'a'
        }
      }

      const resolverB: any = {
        isValid(name: string) {
          return name === 'b'
        }
      }

      const manager = new RouteManager()
      manager.registerMiddlewareResolver(resolverA, 'a').registerMiddlewareResolver(resolverB, 'b')

      const builder = new RouteBuilder(manager)
      const spy = Sinon.spy(builder['route'], 'setMiddleware')

      expect(builder.middleware('a', ['b', 'c']) === builder).toBe(true)
      expect(spy.calledWith('a', 'b')).toBe(true)
    })
  })

  describe('.prefix()', function() {
    it('passes given argument to "route" via .setPrefix()', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const spy = Sinon.spy(builder['route'], 'setPrefix')

      expect(builder.prefix('/') === builder).toBe(true)
      expect(spy.calledWith('/')).toBe(true)
    })
  })

  describe('.group()', function() {
    it('set the property "isGrouping" to to, then call callback then set the property to false again', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
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
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const spy = Sinon.spy(builder['route'], 'setName')

      expect(builder.name('any') === builder).toBe(true)
      expect(spy.calledWith('any')).toBe(true)
    })
  })

  describe('.method()', function() {
    it('passes given argument to "route" via .setMethod(), .setPath()', function() {
      const manager = new RouteManager()
      const builder = new RouteBuilder(manager)
      const setMethodSpy = Sinon.spy(builder['route'], 'setMethod')
      const setPathSpy = Sinon.spy(builder['route'], 'setPath')
      const setTargetSpy = Sinon.spy(builder['route'], 'setTarget')

      expect(builder.method('GET', 'path', 'target') === builder).toBe(true)
      expect(setMethodSpy.calledWith('GET')).toBe(true)
      expect(setPathSpy.calledWith('path')).toBe(true)
      expect(setTargetSpy.calledWith('target')).toBe(false)
    })

    it('also validate target via .validateTarget(), if it is valid pass to "route" via .setTarget()', function() {
      const resolverA: any = {
        isValid(name: string) {
          return name === 'a'
        }
      }
      const manager = new RouteManager()
      manager.registerTargetResolver(resolverA, 'a')

      const builder = new RouteBuilder(manager)
      const setMethodSpy = Sinon.spy(builder['route'], 'setMethod')
      const setPathSpy = Sinon.spy(builder['route'], 'setPath')
      const setTargetSpy = Sinon.spy(builder['route'], 'setTarget')

      expect(builder.method('GET', 'path', 'a') === builder).toBe(true)
      expect(setMethodSpy.calledWith('GET')).toBe(true)
      expect(setPathSpy.calledWith('path')).toBe(true)
      expect(setTargetSpy.calledWith('a')).toBe(true)
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
        const builder = new RouteBuilder(manager)
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
