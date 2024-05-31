const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;
const VERSION = import.meta.env.VITE_SERVER_API_VERSION;

const BASE_URL = `http://${HOST}${PORT}/${VERSION}/`;

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

export class AuthService {
  /* * * Login and save data to local storage * * */

  public login() {}

  /* * * Register new user * * */

  public register() {}
}
