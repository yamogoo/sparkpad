import { defineStore } from "pinia";
import {
  authService,
  type AuthLoginCredentials,
  type AuthorizedUser,
  type AuthRegisterCredentials,
  type User,
} from "~/src/services/authService";
import { LocalStorageAuthKeys } from "../localStorage";

interface AuthStoreState {
  _isLoggedIn: boolean;
  _user: AuthorizedUser | null;
}

const userData = localStorage.getItem(LocalStorageAuthKeys.USER);
const user: AuthorizedUser | null = userData && JSON.parse(userData);
const isLoggedIn = user !== null;

const defaults = { isLoggedIn, user };

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreState => ({
    _isLoggedIn: defaults.isLoggedIn,
    _user: defaults.user,
  }),
  getters: {
    getAccessToken: (state): string | undefined => {
      if (state._user) {
        return state._user.accessToken;
      }
      return undefined;
    },
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
        return user;
      }
      return;
    },

    logout() {
      authService.logout(() => {
        localStorage.removeItem("user");
      });
    },

    setUser(user: AuthorizedUser | null) {
      this._user = user;
      localStorage.setItem(LocalStorageAuthKeys.USER, JSON.stringify(user));
      this._isLoggedIn = true;
    },
  },
});
