/// <reference path="contracts/RouteManager.d.ts" />
/// <reference path="contracts/RouteFactory.d.ts" />
import { Route as RouteClass } from './routing/Route';
import { RouteBuilder as RouteBuilderClass } from './routing/RouteBuilder';
import { RouteManager as RouteManagerClass } from './routing/RouteManager';
import { RouteFactory as RouteFactoryClass } from './routing/RouteFactory';
import { IFacadeContainer, IFacadeBase } from 'najs-facade';
export declare namespace NajsRouting {
    function make<T = string, M = string>(container: IFacadeContainer, routeFactoryClassName?: string, routeManagerClassName?: string): [NajsFramework.Contracts.Routing.RouteManager<T, M>, NajsFramework.Contracts.Routing.RouteFactory<T, M> & IFacadeBase];
    const Route: typeof RouteClass;
    interface Route<T = string, M = string> extends RouteClass<T, M> {
    }
    const RouteBuilder: typeof RouteBuilderClass;
    interface RouteBuilder<T = string, M = string> extends RouteBuilderClass<T, M> {
    }
    const RouteManager: typeof RouteManagerClass;
    interface RouteManager<T = string, M = string> extends RouteManagerClass<T, M> {
    }
    const RouteFactory: typeof RouteFactoryClass;
    interface RouteFactory<T = string, M = string> extends RouteFactoryClass<T, M> {
    }
}
