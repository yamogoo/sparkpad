import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export enum PrivateRoutes {
  EDITOR = `/editor`,
}

export enum PublicRoutes {
  HOME = "/",

  /* * * Auth Provider * * */

  AUTH = "/auth",

  /* * * Auth Forms * * */

  LOGIN = `/auth/login`,
  REGISTER = `/auth/register`,
}

export const routes = [
  /* * * Public * * */
  {
    path: PublicRoutes.AUTH,
    alias: "/",
    name: "Public",
    redirect: () => {
      return { path: PublicRoutes.AUTH };
    },
    component: () => import("@/layouts/public/UIPublicLayout.vue"),
    children: [
      {
        path: PublicRoutes.AUTH,
        name: "Auth",
        redirect: () => {
          return { path: PublicRoutes.LOGIN };
        },
        component: () => import("@/pages/public/UIAuthProviderPage.vue"),
        children: [
          {
            path: PublicRoutes.LOGIN,
            name: "Sign In",
            component: () => import("@/pages/public/UILoginPage.vue"),
            meta: {
              id: 1,
            },
          },
          {
            path: PublicRoutes.REGISTER,
            name: "Sign Up",
            component: () => import("@/pages/public/UIRegisterPage.vue"),
            meta: {
              id: 2,
            },
          },
        ],
      },
    ],
  },
  /* * * Private * * */
  {
    path: PrivateRoutes.EDITOR,
    component: () => import("@/layouts/private/UIPrivateLayout.vue"),
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  const pathes: any[] = Object.values(PublicRoutes);
  const authReuired = !pathes.includes(to.path);

  const isAuthenticated = authStore.isAuthenticated;

  /* * * Auth guard * * */

  if (authReuired && !isAuthenticated) {
    next(PublicRoutes.LOGIN);
  } else {
    next();
  }
});
