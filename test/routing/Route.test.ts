import 'jest'
import { Route } from '../../lib/routing/Route'

describe('Route', function() {
  describe('constructor()', function() {
    it('initialize prefix to empty string and middleware to empty array', function() {
      const route = new Route()
      expect(JSON.stringify(route)).toEqual(JSON.stringify({ prefix: '', middleware: [], isMerged: false }))
    })
  })

  describe('.setType()', function() {
    it('is chainable, simply a setter of "type" property', function() {
      const route = new Route()
      expect(route.setType('any') === route).toBe(true)
      expect(route['type']).toEqual('any')
    })
  })

  describe('.setMethod()', function() {
    it('is chainable, simply a setter of "method" property', function() {
      const route = new Route()
      expect(route.setMethod('GET') === route).toBe(true)
      expect(route['method']).toEqual('GET')
    })
  })

  describe('.setName()', function() {
    it('is chainable, simply a setter of "name" property', function() {
      const route = new Route()
      expect(route.setName('name') === route).toBe(true)
      expect(route['name']).toEqual('name')
    })
  })

  describe('.setPath()', function() {
    it('is chainable, simply a setter of "path" property', function() {
      const route = new Route()
      expect(route.setPath('path') === route).toBe(true)
      expect(route['path']).toEqual('path')
    })
  })

  describe('.setPrefix()', function() {
    it('is chainable, simply a setter of "prefix" property', function() {
      const route = new Route()
      expect(route.setPrefix('prefix') === route).toBe(true)
      expect(route['prefix']).toEqual('prefix')
    })
  })

  describe('.setMiddleware()', function() {
    it('is chainable, it pushes concat given middleware(s) to the "middleware" property then unique the property', function() {
      const route = new Route()
      expect(route['middleware']).toEqual([])
      expect(route.setMiddleware('a', 'b', 'c') === route).toBe(true)
      expect(route['middleware']).toEqual(['a', 'b', 'c'])

      expect(route.setMiddleware('a', 'd', 'e') === route).toBe(true)
      expect(route['middleware']).toEqual(['a', 'b', 'c', 'd', 'e'])
    })
  })

  describe('.setTarget()', function() {
    it('is chainable, simply a setter of "target" property', function() {
      const route = new Route()
      expect(route.setTarget('target') === route).toBe(true)
      expect(route['target']).toEqual('target')
    })
  })

  describe('.setArguments()', function() {
    it('is chainable, simply converts and set given value to "arguments" property', function() {
      const route = new Route()
      expect(route.setArguments({ 0: 1, 1: 'any', 2: 'thing', length: 3 }) === route).toBe(true)
      expect(route['arguments']).toEqual([1, 'any', 'thing'])
    })
  })

  describe('.isValid()', function() {
    it('returns false if method is not set', function() {
      const route = new Route()
      expect(
        route
          .setPath('path')
          .setTarget('target')
          .isValid()
      ).toBe(false)
    })

    it('returns false if path is not set', function() {
      const route = new Route()
      expect(
        route
          .setMethod('all')
          .setTarget('target')
          .isValid()
      ).toBe(false)
    })

    it('returns false if target is not set', function() {
      const route = new Route()
      expect(
        route
          .setMethod('all')
          .setPath('path')
          .isValid()
      ).toBe(false)
    })

    it('returns false if path is set but empty', function() {
      const route = new Route()
      expect(
        route
          .setMethod('all')
          .setPath('')
          .setTarget('target')
          .isValid()
      ).toBe(false)
    })

    it('returns true if path, method, target is set and path is not empty', function() {
      const route = new Route()
      expect(
        route
          .setMethod('all')
          .setPath('path')
          .setTarget('target')
          .isValid()
      ).toBe(true)
    })
  })

  describe('.mergeParentData()', function() {
    it('does nothing if the given parent is undefined', function() {
      const route = new Route()
      route
        .setMethod('GET')
        .setPath('/')
        .setTarget('target')
        .setPrefix('prefix')
        .setMiddleware('a')

      route.mergeParentData(undefined)
      expect(route.getData()).toEqual({
        name: undefined,
        method: 'GET',
        path: '/',
        prefix: 'prefix',
        middleware: ['a'],
        target: 'target'
      })
    })

    it('merges middleware from parent to current Route', function() {
      const parent = new Route()
      parent.setMiddleware('x', 'y', 'a')
      const route = new Route()
      route
        .setMethod('GET')
        .setPath('/')
        .setTarget('target')
        .setPrefix('prefix')
        .setMiddleware('a')

      route.mergeParentData(parent)
      expect(route.getData()).toEqual({
        type: undefined,
        name: undefined,
        method: 'GET',
        path: '/',
        prefix: 'prefix',
        middleware: ['x', 'y', 'a'],
        target: 'target'
      })
    })

    it('merges prefix from parent to current Route but just 1 time', function() {
      const parent = new Route()
      parent.setPrefix('parent').setMiddleware('x', 'y', 'a')
      const route = new Route()
      route
        .setMethod('GET')
        .setPath('/')
        .setTarget('target')
        .setPrefix('prefix')
        .setMiddleware('a')

      route.mergeParentData(parent)
      expect(route.getData()).toEqual({
        type: undefined,
        name: undefined,
        method: 'GET',
        path: '/',
        prefix: 'parent/prefix',
        middleware: ['x', 'y', 'a'],
        target: 'target'
      })
    })

    it('only merges once', function() {
      const parent = new Route()
      parent.setPrefix('parent').setMiddleware('x', 'y', 'a')
      const route = new Route()
      route
        .setMethod('GET')
        .setPath('/')
        .setTarget('target')
        .setPrefix('prefix')
        .setMiddleware('a')

      route.mergeParentData(parent)
      expect(route.getData()).toEqual({
        type: undefined,
        name: undefined,
        method: 'GET',
        path: '/',
        prefix: 'parent/prefix',
        middleware: ['x', 'y', 'a'],
        target: 'target'
      })

      parent.setPrefix('new-prefix').setMiddleware('b', 'c')
      route.mergeParentData(parent)
      expect(route.getData()).toEqual({
        type: undefined,
        name: undefined,
        method: 'GET',
        path: '/',
        prefix: 'parent/prefix',
        middleware: ['x', 'y', 'a'],
        target: 'target'
      })
    })
  })

  describe('.mergePrefix()', function() {
    const dataset = [
      { parent: '', child: 'child', result: 'child' },
      { parent: 'parent', child: '', result: 'parent' },
      { parent: 'parent', child: 'child', result: 'parent/child' },
      { parent: 'parent/', child: '/child', result: 'parent/child' },
      { parent: 'parent/', child: 'child', result: 'parent/child' },
      { parent: 'parent', child: '/child', result: 'parent/child' }
    ]

    for (const data of dataset) {
      it(`case parent = "${data.parent}", child = "${data.child}", result should be "${data.result}"`, function() {
        const route = new Route()
        expect(route.mergePrefix(data.parent, data.child)).toEqual(data.result)
      })
    }
  })

  describe('.getData()', function() {
    it('returns undefined if the .isValid() return false', function() {
      const route = new Route()
      expect(route.getData()).toBeUndefined()
    })

    it('calls .mergeParentData() then returns a raw object which match IRoute interface', function() {
      const parent = new Route()
      parent.setPrefix('parent').setMiddleware('x', 'y', 'a')
      const route = new Route()
      expect(
        route
          .setMethod('GET')
          .setPath('/')
          .setTarget('target')
          .setPrefix('prefix')
          .setMiddleware('a')
          .getData(parent)
      ).toEqual({
        type: undefined,
        name: undefined,
        method: 'GET',
        path: '/',
        prefix: 'parent/prefix',
        middleware: ['x', 'y', 'a'],
        target: 'target'
      })
    })
  })
})
