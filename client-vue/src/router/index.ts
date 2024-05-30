import { createRouter, createWebHistory } from "vue-router";

const routes = [
  /* * * Public * * */
  {
    path: "/public",
    alias: "/",
    name: "Public",
    component: () => import("@/layouts/public/UIPublicLayout.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/public/UILoginPage.vue"),
      },
      {
        path: "/",
        alias: "/register",
        name: "SignUp",
        component: () => import("@/pages/public/UIRegisterPage.vue"),
      },
    ],
  },
  /* * * Private * * */
  {
    path: "/private",
    component: () => import("@/layouts/private/UIPrivateLayout.vue"),
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});
