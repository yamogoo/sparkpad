import { createRouter, createWebHistory } from "vue-router";
import { routes } from ".";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const initRouter = async () => {
  router.beforeEach((_from, _to, next) => {
    next();
  });

  await router.isReady();
};
