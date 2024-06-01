import { defineStore } from "pinia";
import {
  authService,
  type AuthLoginCredentials,
  type AuthRegisterCredentials,
  type User,
} from "~/src/services/authService";
import { LocalStorageAuthKeys } from "../localStorage";

interface AuthStoreState {
  _isLoggedIn: boolean;
  _user: User | null;
}

const userData = localStorage.getItem(LocalStorageAuthKeys.USER);
const user: User | null = userData && JSON.parse(userData);
const isLoggedIn = user !== null;

const defaults = { isLoggedIn, user };

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreState => ({
    _isLoggedIn: defaults.isLoggedIn,
    _user: defaults.user,
  }),
  getters: {},
  actions: {
    async register(credentials: AuthRegisterCredentials) {
      return await authService.register(credentials);
    },

    async login(credentials: AuthLoginCredentials) {
      const user = await authService.login(credentials);
      if (user) {
        const accessToken = user.accessToken;
        localStorage.setItem(LocalStorageAuthKeys.USER, accessToken);
      }
      // if (!error) this.setUser(user);
      return user;
    },

    logout() {
      authService.logout(() => {
        localStorage.removeItem("user");
      });
    },

    setUser(user: User | null) {
      this._user = user;
      localStorage.setItem(LocalStorageAuthKeys.USER, JSON.stringify(user));
      this._isLoggedIn = true;
    },
  },
});
