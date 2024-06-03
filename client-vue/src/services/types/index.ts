export type ApiMethods = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiMethod {
  path: string;
  method: ApiMethods;
}

/* * * Requests * * */

export type BadRequest = {
  code: number;
  message: string;
};
