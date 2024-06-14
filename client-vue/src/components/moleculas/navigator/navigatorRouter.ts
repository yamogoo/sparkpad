import { IndexedRouter } from "@/pluggins/indexedRouter";
import { computed } from "vue";

export enum Routes {
  MINIMIZE = "minimize",
  SEARCH = "search",
  HIERARCHY_MENU = "hierarchy",
  FAVORITES = "favorits",
}

const routes = [
  {
    path: Routes.MINIMIZE,
  },
  {
    path: Routes.SEARCH,
    // component: () => import("@/components/moleculas/hierarchy/UIHierarchySheet.vue"),
  },
  {
    path: Routes.HIERARCHY_MENU,
    // component: () => import("@/components/moleculas/search/UISearchSheet.vue"),
  },
  {
    path: Routes.FAVORITES,
    // component: () => import("@/components/moleculas/search/UISearchSheet.vue"),
  },
];

const currentRoute = Routes.HIERARCHY_MENU;

const router = new IndexedRouter("navigator", routes, currentRoute);

export const useNavigatorRouter = () => router;
export const useNavigatorRoute = () => computed(() => router.route);
