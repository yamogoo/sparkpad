import {
  isAuthorizedUser,
  isUnAuthorizedUser,
  UserRoles,
  type ApiMethod,
  type AuthLoginCredentials,
  type AuthorizedUser,
  type AuthRegisterCredentials,
  type ServiceResponse,
  type UnAuthorizedUser,
  type User,
} from "@/typings";
import { fetchData } from "../utils";

const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const VERSION = import.meta.env.VITE_SERVER_API_VERSION;

const BASE_URL = `http://${HOST}:${PORT}/${VERSION}`;

type ApiKeys = "login" | "register";

export const api: Record<ApiKeys, ApiMethod> = {
  login: {
    path: () => `${BASE_URL}/auth/login`,
    method: "POST",
  },
  register: {
    path: () => `${BASE_URL}/auth/register`,
    method: "POST",
  },
};

export class AuthService {
  /* * * Register new user * * */

  public async register(
    credentials: AuthRegisterCredentials
  ): Promise<ServiceResponse<UnAuthorizedUser>> {
    const roles = [UserRoles.USER];

    const res = await fetchData({
      method: api.register.method,
      url: api.register.path(),
      body: { ...credentials, roles },
    });

    if (!isUnAuthorizedUser(res.payload)) {
      return { error: res.error };
    }
    const { error, payload } = res;
    return { payload, error };
  }

  public async login(
    credentials: AuthLoginCredentials
  ): Promise<ServiceResponse<AuthorizedUser>> {
    const res = await fetchData({
      method: api.login.method,
      url: api.login.path(),
      body: credentials,
    });

    if (!isAuthorizedUser(res.payload)) return { error: res.error };
    const { error, payload } = res;
    return { payload, error };
  }

  public logout(cb: () => void) {
    cb();
  }
}

export const authService = new AuthService();
