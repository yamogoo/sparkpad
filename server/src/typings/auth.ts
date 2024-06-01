import { Roles } from "@/models/RoleModel";

export interface RegisterCredentialsRequest {
  login: string;
  email: string;
  password: string;
  roles: Roles[];
}
