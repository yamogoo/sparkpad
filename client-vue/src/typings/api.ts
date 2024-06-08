/* * * Description of methods * * */

export type ApiMethods = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiMethod {
  path: (...args: any) => string;
  method: ApiMethods;
}

/* * * Request/Requests * * */

export interface ApiResponse<P> {
  payload?: P;
  error?: string;
}

export interface ServiceError {
  statusCode: number;
  message: string;
}

export interface ServiceResponse<T> {
  payload?: T;
  error?: string;
}
