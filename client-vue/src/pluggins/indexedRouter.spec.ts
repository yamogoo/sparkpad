import { describe, expect, test } from "vitest";

import { IndexedRouter, type IndexedRoute } from "./indexedRouter";

const routes: Array<IndexedRoute> = [{ path: "/home" }, { path: "/settings" }];

const DEFAULT_ROUTE = "/home";
const NEW_ROUTE: IndexedRoute = { path: "new" };

describe("indexedRouter", () => {
  describe("routes", () => {
    const router = new IndexedRouter("router", routes, DEFAULT_ROUTE);

    test("should set routes", () => {
      const routerRoutes = router.getRoutes();

      expect(routerRoutes).toMatchObject(routes);
      expect(routerRoutes).toMatchSnapshot();
    });

    test(`current route path should be ${DEFAULT_ROUTE}`, () => {
      const currentRoute = router.route.path;

      expect(currentRoute).toBe(DEFAULT_ROUTE);
      expect(currentRoute).toMatchSnapshot();
    });

    test(`should retern route by route path (${DEFAULT_ROUTE})`, () => {
      const findedRoute = router.findRoute(DEFAULT_ROUTE);

      expect(findedRoute.path).toBe(DEFAULT_ROUTE);
      expect(findedRoute).toMatchSnapshot();
    });

    test(`should add new route to routes and set current route (${NEW_ROUTE})`, () => {
      router.push(NEW_ROUTE);

      const currentRoute = router.route;

      expect(currentRoute).toMatchObject(NEW_ROUTE);
      expect(currentRoute).toMatchSnapshot();
    });
  });
});
