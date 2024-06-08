export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export type UserRolesList = Array<UserRoles>;

export interface User {
  id: string;
  login: string;
  email: string;
  password: string;
  roles: UserRolesList;
}

export interface AuthorizedUser extends Pick<User, "login" | "email"> {
  accessToken: string;
}

export type UserCreation = Omit<User, "id">;

/* * * Guards * * */

export const isUserRole = (roles: any): roles is UserRolesList => {
  return (
    roles !== null &&
    roles !== undefined &&
    Array.isArray(roles) &&
    roles.every((role) => typeof role === "string")
  );
};

export const isUserCreation = (user: any): user is UserCreation => {
  return (
    user !== null &&
    user !== undefined &&
    typeof user === "object" &&
    typeof user.login === "string" &&
    typeof user.email === "string" &&
    typeof user.password === "string" &&
    Array.isArray(user.roles) &&
    user.roles.every(isUserRole)
  );
};
