import { IndexedRouter } from "@/pluggins/indexedRouter";
import { computed } from "vue";

export enum Routes {
  ABOUT = "about",
  GENERAL = "general",
  USER = "user",
  EDITOR = "editor",
}

const routes = [
  {
    path: Routes.ABOUT,
  },
  {
    path: Routes.GENERAL,
  },
  {
    path: Routes.USER,
  },
  {
    path: Routes.EDITOR,
  },
];

const currentRoute = Routes.ABOUT;

const router = new IndexedRouter("settings", routes, currentRoute);

export const useSettingsRouter = () => router;
export const useSettingsRoute = () => computed(() => router.route);
