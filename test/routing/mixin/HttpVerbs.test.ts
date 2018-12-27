import 'jest'
import * as Sinon from 'sinon'
import { HttpMethod } from '../../../lib/routing/HttpMethod'
import { HttpVerbs } from '../../../lib/routing/mixin/HttpVerbs'

describe('HttpVerbs', function() {
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
        const container = {
          method() {
            return 'anything'
          }
        }
        const spy = Sinon.spy(container, 'method')

        expect(HttpVerbs[func].apply(container, ['a'])).toEqual('anything')
        expect(spy.calledWith(HTTP_VERBS[func], 'a')).toBe(true)
        spy.resetHistory()
        expect(HttpVerbs[func].apply(container, ['a', 'b'])).toEqual('anything')
        expect(spy.calledWith(HTTP_VERBS[func], 'a', 'b')).toBe(true)
      })
    })
  }
})
