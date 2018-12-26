/// <reference path="./Middleware.ts" />

namespace NajsRouting.Grammar {
  /*
   * The purpose of these interfaces is create a grammar for Route, it affects nothing to implementation side
   * This file has test in ~/test/syntax/..., if something went wrong errors will come out from build phase
   *
   * There are some rules:
   *   - Could not chain HTTP methods after using .group()
   *   - Could not chain group() after using .name()
   */
  export type ControlChain<T, M> = Control<M> & Group<M> & Verbs<T, M> & Named<T, M>
  export type ControlNoVerbChain<M> = ControlNoVerb<M> & NamedNoVerb<M>
  export type GroupChain<M> = ControlOnly<M>
  export type VerbChain<M> = ControlNoVerb<M> & NamedNoVerb<M>
  export type NameChain<T, M> = ControlOnly<M> & Verbs<T, M>
  export type NameChainNoVerb<M> = ControlOnly<M>

  export interface Routing<T = Target, M = Middleware> extends Control<T, M>, Group<M>, Named<T, M>, Verbs<T, M> {}

  export interface Control<T = Target, M = Middleware> {
    middleware(...middleware: Array<M | M[]>): ControlChain<T, M>

    prefix(prefix: string): ControlChain<T, M>
  }

  export interface ControlNoVerb<M = Middleware> {
    middleware(...middleware: Array<M | M[]>): ControlNoVerbChain<M>

    prefix(prefix: string): ControlNoVerbChain<M>
  }

  export interface ControlOnly<M = Middleware> {
    middleware(...middleware: Array<M | M[]>): ControlOnly<M>

    prefix(prefix: string): ControlOnly<M>
  }

  export interface Group<M = Middleware> {
    group(callback: () => void): GroupChain<M>
  }

  export interface Named<T = Target, M = Middleware> {
    name(name: string): NameChain<T, M>
  }

  export interface NamedNoVerb<M = Middleware> {
    name(name: string): NameChainNoVerb<M>
  }

  export interface Verbs<T = Target, M = Middleware> extends Method<T, M>, HttpVerbs<T, M> {}

  export interface Method<T = Target, M = Middleware> {
    method(method: HttpMethod | 'all', path: string, target: T): VerbChain<M>
  }

  export interface HttpVerbs<T = Target, M = Middleware> {
    all(path: string, target: T): VerbChain<M>
    checkout(path: string, target: T): VerbChain<M>
    copy(path: string, target: T): VerbChain<M>
    delete(path: string, target: T): VerbChain<M>
    get(path: string, target: T): VerbChain<M>
    head(path: string, target: T): VerbChain<M>
    lock(path: string, target: T): VerbChain<M>
    merge(path: string, target: T): VerbChain<M>
    mkactivity(path: string, target: T): VerbChain<M>
    mkcol(path: string, target: T): VerbChain<M>
    move(path: string, target: T): VerbChain<M>
    msearch(path: string, target: T): VerbChain<M>
    notify(path: string, target: T): VerbChain<M>
    options(path: string, target: T): VerbChain<M>
    patch(path: string, target: T): VerbChain<M>
    post(path: string, target: T): VerbChain<M>
    purge(path: string, target: T): VerbChain<M>
    put(path: string, target: T): VerbChain<M>
    report(path: string, target: T): VerbChain<M>
    search(path: string, target: T): VerbChain<M>
    subscribe(path: string, target: T): VerbChain<M>
    trace(path: string, target: T): VerbChain<M>
    unlock(path: string, target: T): VerbChain<M>
    unsubscribe(path: string, target: T): VerbChain<M>
  }
}
