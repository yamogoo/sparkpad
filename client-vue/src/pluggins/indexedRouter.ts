import { ref, type Ref } from "vue";

export interface IndexedRoute<M = any> {
  id?: string;
  path: string;
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
    /* * * Find current Route * * */

    this.name = routerName;
    this.#route = ref({ path: currentRoutePath });
    this.route = this.findRoute(currentRoutePath);
  }

  public set route(route: IndexedRoute) {
    this.#route.value = route;
  }

  public get route(): IndexedRoute {
    return this.#route.value;
  }

  public getRoutes(): Array<IndexedRoute> {
    return this.routes;
  }

  public push(route: IndexedRoute): void {
    this.routes.push(route);
    this.route = route;
  }

  public findRoute(path: string): IndexedRoute {
    path.split("/");
    return { path };
  }
}
