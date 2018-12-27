"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MESSAGE = 'Route ":route" is not found.';
class RouteNotFoundError extends Error {
    constructor(name) {
        super(MESSAGE.replace(':route', name));
        Error.captureStackTrace(this, RouteNotFoundError);
        this.name = RouteNotFoundError.className;
    }
}
RouteNotFoundError.className = 'RouteNotFoundError';
exports.RouteNotFoundError = RouteNotFoundError;
