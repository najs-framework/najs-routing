const MESSAGE = 'Route ":route" is not found.'

export class RouteNotFoundError extends Error {
  static className: string = 'RouteNotFoundError'

  model: string

  constructor(name: string) {
    super(MESSAGE.replace(':route', name))
    Error.captureStackTrace(this, RouteNotFoundError)
    this.name = RouteNotFoundError.className
  }
}
