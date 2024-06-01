import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

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

// router.beforeEach((to, from) => {
//   const authStore = useAuthStore();
//   const accessToken = authStore.getAccessToken;

//   if (accessToken) router.push({ path: "/public" });
// });
