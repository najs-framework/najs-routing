/// <reference path="../../definitions/Grammar.ts" />

import Routing = NajsRouting.Grammar.Routing
import { HttpMethod } from '../HttpMethod'

export const HttpVerbs: NajsRouting.Grammar.HttpVerbs<any, any> = {
  all(this: Routing, path: string, target: any): any {
    return this.method.apply(this, ['all'].concat(Array.from(arguments)))
  },

  checkout(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.CHECKOUT].concat(Array.from(arguments)))
  },

  copy(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.COPY].concat(Array.from(arguments)))
  },

  delete(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.DELETE].concat(Array.from(arguments)))
  },

  get(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.GET].concat(Array.from(arguments)))
  },

  head(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.HEAD].concat(Array.from(arguments)))
  },

  lock(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.LOCK].concat(Array.from(arguments)))
  },

  merge(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.MERGE].concat(Array.from(arguments)))
  },

  mkactivity(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.MKACTIVITY].concat(Array.from(arguments)))
  },

  mkcol(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.MKCOL].concat(Array.from(arguments)))
  },

  move(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.MOVE].concat(Array.from(arguments)))
  },

  msearch(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.M_SEARCH].concat(Array.from(arguments)))
  },

  notify(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.NOTIFY].concat(Array.from(arguments)))
  },

  options(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.OPTIONS].concat(Array.from(arguments)))
  },

  patch(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.PATCH].concat(Array.from(arguments)))
  },

  post(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.POST].concat(Array.from(arguments)))
  },

  purge(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.PURGE].concat(Array.from(arguments)))
  },

  put(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.PUT].concat(Array.from(arguments)))
  },

  report(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.REPORT].concat(Array.from(arguments)))
  },

  search(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.SEARCH].concat(Array.from(arguments)))
  },

  subscribe(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.SUBSCRIBE].concat(Array.from(arguments)))
  },

  trace(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.TRACE].concat(Array.from(arguments)))
  },

  unlock(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.UNLOCK].concat(Array.from(arguments)))
  },

  unsubscribe(this: Routing, path: string, target: any): any {
    return this.method.apply(this, [HttpMethod.UNSUBSCRIBE].concat(Array.from(arguments)))
  }
}
