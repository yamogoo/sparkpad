export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  login: string;
  email: string;
  password: string;
  roles: UserRoles[];
}

export interface AuthorizedUser {
  login: string;
  email: string;
  accessToken: string;
}

export type UnAuthorizedUser = Pick<AuthorizedUser, "login" | "email">;

/* * * Guards * * */

export const isUserRole = (userRole: any): userRole is string => {
  return typeof userRole === "string";
};

export const isUser = (user: any): user is User => {
  return (
    user !== null &&
    typeof user === "object" &&
    typeof user.login === "string" &&
    typeof user.email === "string" &&
    typeof user.password === "string" &&
    Array.isArray(user.roles) &&
    user.roles.every(isUserRole)
  );
};

export const isAuthorizedUser = (user: any): user is AuthorizedUser => {
  return (
    user !== null &&
    typeof user === "object" &&
    typeof user.login === "string" &&
    typeof user.email === "string" &&
    typeof user.accessToken === "string"
  );
};

export const isUnAuthorizedUser = (user: any): user is UnAuthorizedUser => {
  return (
    user !== null &&
    typeof user === "object" &&
    typeof user.login === "string" &&
    typeof user.email === "string"
  );
};
