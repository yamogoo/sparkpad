import { IndexedRouter } from "@/pluggins/indexedRouter";
import { computed } from "vue";

const routes = [
  {
    path: "/about",
  },
  {
    path: "/user",
  },
];

const currentRoute = "/about";

const router = new IndexedRouter("settings", routes, currentRoute);

export const useSettingsRouter = () => router;
export const useSettingsRoute = () => computed(() => router.route);
