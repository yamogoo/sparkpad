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
  status?: number;
}

export enum ServiceStatuses {
  ERROR = -1,
  OK = 1,
  NOT_VALID_DATA = 2,
}
export interface ServiceError {
  statusCode: number;
  message: string;
}

export interface ServiceStatus {
  status: number;
}

export interface ServiceResponse<T> {
  payload?: T;
  status?: number;
  error?: string;
}
