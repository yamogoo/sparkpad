export interface ApiBadResponse {
  error?: string;
}

export interface ApiResponse<P> extends ApiBadResponse {
  payload?: P;
}
