import { defineStore } from "pinia";
import {
  authService,
  type AuthLoginCredentials,
  type AuthorizedUser,
  type AuthRegisterCredentials,
} from "@/services/auth/authService";
import { LocalStorageAuthKeys } from "../localStorage";

interface AuthStoreState {
  _isAuthenticated: boolean;
  _user: AuthorizedUser | null;
}

const userData = localStorage.getItem(LocalStorageAuthKeys.USER);
const user: AuthorizedUser | null = userData && JSON.parse(userData);
const isAuthenticated = user !== null;

const defaults = { isAuthenticated, user };

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreState => ({
    _isAuthenticated: defaults.isAuthenticated,
    _user: defaults.user,
  }),
  getters: {
    getAccessToken: (state): string | undefined => {
      if (state._user) {
        return state._user.accessToken;
      }
      return undefined;
    },

    isAuthenticated: (state): boolean => state._isAuthenticated,
    user: (state): AuthorizedUser | null => state._user,
  },
  actions: {
    async register(credentials: AuthRegisterCredentials) {
      return await authService.register(credentials);
    },

    async login(credentials: AuthLoginCredentials) {
      const user = await authService.login(credentials);

      if (user) {
        localStorage.setItem(LocalStorageAuthKeys.USER, JSON.stringify(user));
        this.setUser(user);
      }
      return user;
    },

    logout() {
      authService.logout(() => {
        localStorage.removeItem("user");
      });
    },

    setUser(user: AuthorizedUser | null) {
      this._user = user;
      localStorage.setItem(LocalStorageAuthKeys.USER, JSON.stringify(user));
      this._isAuthenticated = true;
    },
  },
});
