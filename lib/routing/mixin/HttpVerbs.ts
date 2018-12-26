/// <reference path="../../definitions/Grammar.ts" />

import Routing = NajsRouting.Grammar.Routing
import { HttpMethod } from '../HttpMethod'

export const HttpVerbs: NajsRouting.Grammar.HttpVerbs<any, any> = {
  all(this: Routing, path: string, target: any): any {
    return this.method('all', path, target)
  },

  checkout(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.CHECKOUT, path, target)
  },

  copy(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.COPY, path, target)
  },

  delete(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.DELETE, path, target)
  },

  get(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.GET, path, target)
  },

  head(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.HEAD, path, target)
  },

  lock(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.LOCK, path, target)
  },

  merge(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.MERGE, path, target)
  },

  mkactivity(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.MKACTIVITY, path, target)
  },

  mkcol(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.MKCOL, path, target)
  },

  move(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.MOVE, path, target)
  },

  msearch(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.M_SEARCH, path, target)
  },

  notify(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.NOTIFY, path, target)
  },

  options(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.OPTIONS, path, target)
  },

  patch(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.PATCH, path, target)
  },

  post(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.POST, path, target)
  },

  purge(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.PURGE, path, target)
  },

  put(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.PUT, path, target)
  },

  report(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.REPORT, path, target)
  },

  search(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.SEARCH, path, target)
  },

  subscribe(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.SUBSCRIBE, path, target)
  },

  trace(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.TRACE, path, target)
  },

  unlock(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.UNLOCK, path, target)
  },

  unsubscribe(this: Routing, path: string, target: any): any {
    return this.method(HttpMethod.UNSUBSCRIBE, path, target)
  }
}
