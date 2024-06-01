const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const VERSION = import.meta.env.VITE_SERVER_API_VERSION;

const BASE_URL = `http://${HOST}:${PORT}/${VERSION}`;

export const api = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
};

export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  login: string;
  email: string;
  password: string;
  roles: [Roles];
}

export interface AuthorizedUser extends User {
  accessToken: string;
}

export interface AuthRegisterCredentials {
  login: string;
  email: string;
  password: string;
  roles?: Roles[];
}

export interface AuthLoginCredentials {
  login: string;
  password: string;
}

export class AuthService {
  /* * * Register new user * * */

  public async register(credentials: AuthRegisterCredentials) {
    const { login, email, password } = credentials;

    const RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        email,
        password,
        roles: [Roles.USER],
      }),
    };

    const res = await fetch(api.register, RequestInit);
    const data = await res.json();
    console.log(data);
    return data;
  }

  /* * * Login and save data to local storage * * */

  public async login(
    credentials: AuthLoginCredentials
  ): Promise<AuthorizedUser> {
    const { login, password } = credentials;

    const RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        password,
      }),
    };

    const res = await fetch(api.login, RequestInit);

    if (res.status === 400) {
      console.log("error");
    }

    const { user }: { user: AuthorizedUser } = await res.json();
    return user;
  }

  public logout(cb: () => void) {
    cb();
  }
}

export const authService = new AuthService();
