import { ref, type Ref, type VNodeTypes } from "vue";

export interface IndexedRoute<M = any> {
  path: string;
  component?: VNodeTypes;
  meta?: M;
}

export class IndexedRouter {
  name: string;
  #route: Ref<IndexedRoute>;

  constructor(
    routerName: string,
    public routes: Array<IndexedRoute>,
    currentRoutePath: string
  ) {
    this.name = routerName;

    const route = this.findRoute(currentRoutePath);
    this.#route = ref(route);
    this.route = this.findRoute(currentRoutePath);
  }

  /**
   * @description Set current route
   */
  public set route(route: IndexedRoute) {
    this.#route.value = route;
  }

  /**
   * @description Get current route
   */
  public get route(): IndexedRoute {
    return this.#route.value;
  }

  /**
   * @description Get all routes
   */
  public getRoutes(): Array<IndexedRoute> {
    return this.routes;
  }

  /**
   * @description Add route
   */
  public push(route: IndexedRoute): void {
    this.routes.push(route);
    this.route = route;
  }

  /**
   * @description Find route by path
   */
  public findRoute(_path: string): IndexedRoute {
    // _path.split("/");

    const route = this.routes.find((route) => route.path === _path) ?? {
      path: "",
      component: undefined,
    };

    const { path, component, meta } = route;
    return { path, component, meta };
  }
}
