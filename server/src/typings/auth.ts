import { User } from "./user";

export interface AuthBody {
  userId: string;
}

export type Authenticated<T> = AuthBody & T;

export type LoginCredentials = Pick<User, "login" | "password">;

/* * * Guards * * */

export const isAuthToken = (token: any): token is string => {
  return (
    token !== null &&
    token !== undefined &&
    typeof token === "string" &&
    !Array.isArray(token)
  );
};
