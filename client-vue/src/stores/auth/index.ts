import { defineStore } from "pinia";
import { authService } from "@/services/auth/authService";

import {
  type AuthLoginCredentials,
  type AuthorizedUser,
  type AuthRegisterCredentials,
} from "@/typings";

import { LocalStorageAuthKeys } from "@/typings/localStorage";

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
    async register(
      credentials: AuthRegisterCredentials
    ): Promise<string | undefined> {
      const res = await authService.register(credentials);
      const { payload, error } = res;

      if (error) return error;
      else if (payload && !error) {
        const unAuthorizedUser = payload;
        if (unAuthorizedUser) return;
      }
      return error;
    },

    async login(
      credentials: AuthLoginCredentials
    ): Promise<string | undefined> {
      const res = await authService.login(credentials);
      const { payload, error } = res;

      if (error) return error;
      else if (payload && !error) {
        const authorizedUser = payload;

        localStorage.setItem(
          LocalStorageAuthKeys.USER,
          JSON.stringify(authorizedUser)
        );
        this.setUser(authorizedUser);

        const { accessToken } = authorizedUser;
        if (accessToken) return;
      }
      return error;
    },

    logout() {
      authService.logout(() => {
        localStorage.removeItem("user");
      });
      this.setUser(null);
    },

    setUser(user: AuthorizedUser | null) {
      this._user = user;
      localStorage.setItem(LocalStorageAuthKeys.USER, JSON.stringify(user));
      this._isAuthenticated = true;
    },
  },
});
