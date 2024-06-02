import { createRouter, createWebHistory } from "vue-router";

export enum Routes {
  LOGIN = `/public/auth/login`,
  REGISTER = `/public/auth/register`,
  EDITOR = `/private`,
}

const routes = [
  /* * * Public * * */
  // {
  //   path: "/public",
  //   alias: "/",
  //   name: "Public",
  //   redirect: () => {
  //     return { path: "/public/auth" };
  //   },
  //   component: () => import("@/layouts/public/UIPublicLayout.vue"),
  //   children: [
  //     {
  //       path: "/public/auth",
  //       name: "Auth",
  //       component: () => import("@/pages/public/UIAuthProviderPage.vue"),
  //       children: [
  //         {
  //           path: "/login",
  //           name: "Login",
  //           component: () => import("@/pages/public/UILoginPage.vue"),
  //         },
  //         {
  //           path: "/",
  //           alias: "/register",
  //           name: "SignUp",
  //           component: () => import("@/pages/public/UIRegisterPage.vue"),
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: "/",
    alias: "/",
    name: "Public",
    component: () => import("@/pages/public/UIAuthProviderPage.vue"),
  },
  {
    path: Routes.LOGIN,
    name: "Login",
    component: () => import("@/pages/public/UILoginPage.vue"),
  },
  {
    path: "/",
    alias: Routes.REGISTER,
    name: "SignUp",
    component: () => import("@/pages/public/UIRegisterPage.vue"),
  },
  /* * * Private * * */
  {
    path: Routes.EDITOR,
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
