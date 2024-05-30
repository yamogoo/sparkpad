import { defineStore } from "pinia";

interface AuthStoreState {
  isLogged: boolean;
}

export const useAuthStore = defineStore("auth", () => ({
  state: (): AuthStoreState => ({
    isLogged: false,
  }),
}));
