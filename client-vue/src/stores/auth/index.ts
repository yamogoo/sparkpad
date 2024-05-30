import { defineStore } from "pinia";

interface AuthStoreState {
  isLoggedIn: boolean;
}

export const useAuthStore = defineStore("auth", () => ({
  state: (): AuthStoreState => ({
    isLoggedIn: false,
  }),
}));
