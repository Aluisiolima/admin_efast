import { AuthError } from "../Errors/AuthError";
import { ResponseApi } from "../types/Response.type";

/**
 * Sends an HTTP request to the specified API endpoint using the given method and request body.
 *
 * @param data - The request body, can be an array or null.
 * @param method - The HTTP method to use (e.g., "GET", "POST", "PUT", "DELETE").
 * @param url - The URL of the API endpoint.
 * @returns A `ResponseApi` object containing the response from the API.
 *
 * @throws Throws an error if the request fails or the response cannot be parsed.
 *
 * @example
 * const response = await fetchApi([{ name: "John" }], "POST", "/api/users");
 */
export async function fetchApi<T>(
  data: any | null,
  method: string,
  url: string,
  isJson: boolean = true,
): Promise<T> {
  try {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {};

    if (isJson) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (data) {
      options.body = isJson ? JSON.stringify(data) : data;
    }

    const apiKey = process.env.REACT_APP_LINK_API;

    const response = await fetch(`${apiKey}${url}`, options);

    const result: ResponseApi<T> = await response.json();

    if (result.error) {
      console.log(result.error);
    }

    if (response.status === 401) {
      throw new AuthError("Token inválido ou expirado");
    }

    return result.data;
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    throw error;
  }
}
