import type { ApiError } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${path}`;
  const token = sessionStorage.getItem("auth_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof options.headers === "object" && options.headers !== null) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: ApiError;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        success: false,
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
      throw new ApiRequestError(errorData.message, {
        status: response.status,
        fieldErrors: errorData.errors,
      });
    }
  }

  return response.json();
}
export class ApiRequestError extends Error {
  status?: number;
  fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    options?: { status?: number; fieldErrors?: Record<string, string[]> },
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiRequestError.prototype);
    this.status = options?.status;
    this.fieldErrors = options?.fieldErrors;
  }
}

export function isApiError(err: unknown): err is ApiRequestError {
  return err instanceof ApiRequestError;
}
