import type { ApiResponse, ServiceError } from "@/typings";

export const isApiResponse = <P>(response: any): response is ApiResponse<P> => {
  return (
    (response !== null &&
      typeof response === "object" &&
      typeof response.payload === "object") ||
    (response !== null &&
      typeof response === "object" &&
      typeof response.error === "object")
  );
};

export const defaultRequestHeaders = () => {
  return { "Content-Type": "application/json;charset=UTF-8" };
};

interface FetchDataArgs {
  headers?: { [key: string]: string };
  method: string;
  body?: { [key: string]: any };
  url: string;
}

export const fetchData = async (
  opts: FetchDataArgs
): Promise<ApiResponse<unknown | ServiceError>> => {
  const { headers, method, body, url } = opts;

  const DefaultRequest = {
    method,
    headers: { ...headers, ...defaultRequestHeaders() },
  };

  try {
    const res = await fetch(
      url,
      body
        ? { ...DefaultRequest, body: JSON.stringify(body) }
        : { ...DefaultRequest }
    );

    if (!res.ok) {
      const data = await res.json();
      const { error } = data;
      return { error };
    }

    const data = await res.json();

    if (!isApiResponse(data)) return { error: "Recieved invalid data" };

    const { payload, error } = data;
    return { payload, error };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
