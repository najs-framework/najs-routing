/// <reference path="Middleware.d.ts" />
declare namespace NajsRouting.Grammar {
    type ControlChain<T, M> = Control<M> & Group<M> & Verbs<T, M> & Named<T, M>;
    type ControlNoVerbChain<M> = ControlNoVerb<M> & NamedNoVerb<M>;
    type GroupChain<M> = ControlOnly<M>;
    type VerbChain<M> = ControlNoVerb<M> & NamedNoVerb<M>;
    type NameChain<T, M> = ControlOnly<M> & Verbs<T, M>;
    type NameChainNoVerb<M> = ControlOnly<M>;
    interface Routing<T = Target, M = Middleware> extends Control<T, M>, Group<M>, Named<T, M>, Verbs<T, M> {
    }
    interface Control<T = Target, M = Middleware> {
        middleware(...middleware: Array<M | M[]>): ControlChain<T, M>;
        prefix(prefix: string): ControlChain<T, M>;
    }
    interface ControlNoVerb<M = Middleware> {
        middleware(...middleware: Array<M | M[]>): ControlNoVerbChain<M>;
        prefix(prefix: string): ControlNoVerbChain<M>;
    }
    interface ControlOnly<M = Middleware> {
        middleware(...middleware: Array<M | M[]>): ControlOnly<M>;
        prefix(prefix: string): ControlOnly<M>;
    }
    interface Group<M = Middleware> {
        group(callback: () => void): GroupChain<M>;
    }
    interface Named<T = Target, M = Middleware> {
        name(name: string): NameChain<T, M>;
    }
    interface NamedNoVerb<M = Middleware> {
        name(name: string): NameChainNoVerb<M>;
    }
    interface Verbs<T = Target, M = Middleware> {
        method(method: HttpMethod | 'all', path: string, target: T): VerbChain<M>;
        all(path: string, target: T): VerbChain<M>;
        checkout(path: string, target: T): VerbChain<M>;
        copy(path: string, target: T): VerbChain<M>;
        delete(path: string, target: T): VerbChain<M>;
        get(path: string, target: T): VerbChain<M>;
        head(path: string, target: T): VerbChain<M>;
        lock(path: string, target: T): VerbChain<M>;
        merge(path: string, target: T): VerbChain<M>;
        mkactivity(path: string, target: T): VerbChain<M>;
        mkcol(path: string, target: T): VerbChain<M>;
        move(path: string, target: T): VerbChain<M>;
        msearch(path: string, target: T): VerbChain<M>;
        notify(path: string, target: T): VerbChain<M>;
        options(path: string, target: T): VerbChain<M>;
        patch(path: string, target: T): VerbChain<M>;
        post(path: string, target: T): VerbChain<M>;
        purge(path: string, target: T): VerbChain<M>;
        put(path: string, target: T): VerbChain<M>;
        report(path: string, target: T): VerbChain<M>;
        search(path: string, target: T): VerbChain<M>;
        subscribe(path: string, target: T): VerbChain<M>;
        trace(path: string, target: T): VerbChain<M>;
        unlock(path: string, target: T): VerbChain<M>;
        unsubscribe(path: string, target: T): VerbChain<M>;
    }
}
