import type { UserRoles } from "./user";

export interface AuthRegisterCredentials {
  login: string;
  email: string;
  password: string;
  roles?: UserRoles[];
}

export interface AuthLoginCredentials {
  login: string;
  password: string;
}
