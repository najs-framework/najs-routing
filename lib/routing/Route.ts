/// <reference path="../definitions/HttpMethod.ts" />
/// <reference path="../definitions/Middleware.ts" />
/// <reference path="../definitions/Target.ts" />
/// <reference path="../definitions/IRoute.ts" />

import HttpMethod = NajsRouting.HttpMethod
import Middleware = NajsRouting.Middleware
import Target = NajsRouting.Target
import IRoute = NajsRouting.IRoute

export class Route<T = Target, M = Middleware> {
  protected type?: string
  protected name?: string
  protected method?: HttpMethod | 'all'
  protected path?: string
  protected prefix: string
  protected middleware: M[]
  protected target?: T
  protected arguments?: any[]
  protected isMerged: boolean

  constructor() {
    this.prefix = ''
    this.middleware = []
    this.isMerged = false
  }

  setType(type: string): this {
    this.type = type
    return this
  }

  setMethod(method: HttpMethod | 'all'): this {
    this.method = method
    return this
  }

  setName(name: string): this {
    this.name = name
    return this
  }

  setPath(path: string): this {
    this.path = path
    return this
  }

  setPrefix(prefix: string): this {
    this.prefix = prefix
    return this
  }

  setMiddleware(...middleware: M[]): this {
    this.middleware = Array.from(new Set(this.middleware.concat(middleware)))
    return this
  }

  setTarget(target: T): this {
    this.target = target
    return this
  }

  setArguments(args: ArrayLike<any>): this {
    this.arguments = Array.from(args)
    return this
  }

  isValid(): boolean {
    return (
      typeof this.method !== 'undefined' &&
      typeof this.path !== 'undefined' &&
      typeof this.target !== 'undefined' &&
      this.path !== ''
    )
  }

  mergeParentData(parent?: Route<T, M>) {
    if (typeof parent === 'undefined') {
      return
    }

    if (!this.isMerged) {
      this.prefix = this.mergePrefix(parent.prefix, this.prefix)
      this.middleware = Array.from(new Set(parent.middleware.concat(this.middleware)))
    }
    this.isMerged = true
  }

  mergePrefix(lhs: string, rhs: string, separator: string = '/'): string {
    if (lhs === '' || rhs === '') {
      return lhs + rhs
    }

    if (!lhs.endsWith(separator) && !rhs.startsWith(separator)) {
      return lhs + separator + rhs
    }

    if (lhs.endsWith(separator) && rhs.startsWith(separator)) {
      return lhs + rhs.substr(1)
    }

    return lhs + rhs
  }

  getData(parent?: Route<T, M>): IRoute<T, M> | undefined {
    if (!this.isValid()) {
      return undefined
    }

    this.mergeParentData(parent)
    return {
      type: this.type,
      name: this.name,
      method: this.method as HttpMethod | 'all',
      path: this.path as string,
      prefix: this.prefix,
      middleware: this.middleware,
      target: this.target as T,
      arguments: this.arguments as any[]
    }
  }
}
