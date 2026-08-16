/**
 * Minimal HTTP client for the Paystack REST API, built on the global `fetch`
 * available in Node.js 18+.
 *
 * It replaces axios while keeping the small surface the SDK modules rely on:
 * get/post/put/patch/delete/request, query-string parameters, JSON bodies, and
 * unwrapping each response to its parsed body.
 */

// `@types/node@16` does not type the global `fetch`, so we declare the minimal
// surface we use here. This declaration is module-scoped and erased at build.
interface FetchRequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

interface FetchResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json(): Promise<unknown>;
}

declare function fetch(
  url: string,
  init?: FetchRequestInit,
): Promise<FetchResponse>;

const BASE_URL = 'https://api.paystack.co';

export interface HttpRequestOptions {
  params?: Record<string, unknown>;
  data?: unknown;
}

export interface HttpRequestConfig extends HttpRequestOptions {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
}

export interface HttpClient {
  get<T>(url: string, options?: HttpRequestOptions): Promise<T>;
  post<T>(url: string, data?: unknown): Promise<T>;
  put<T>(url: string, data?: unknown): Promise<T>;
  patch<T>(url: string, data?: unknown): Promise<T>;
  delete<T>(url: string, options?: HttpRequestOptions): Promise<T>;
  request<T>(config: HttpRequestConfig): Promise<T>;
}

/** Error thrown for non-2xx responses, carrying the parsed Paystack body. */
export class PaystackHttpError extends Error {
  constructor(public readonly status: number, public readonly body: unknown) {
    super(`Paystack request failed with status ${status}`);
    this.name = 'PaystackHttpError';
  }
}

function encodeQueryValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}

function serializeQuery(params?: Record<string, unknown>): string {
  if (!params) {
    return '';
  }
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(encodeQueryValue(item));
      parts.push(`${encodedKey}=${encodedValue}`);
    }
  }
  return parts.length ? `?${parts.join('&')}` : '';
}

export function createHttpClient(key: string): HttpClient {
  const headers = {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };

  async function send<T>(
    url: string,
    method: string,
    options: HttpRequestOptions = {},
  ): Promise<T> {
    const fullUrl = `${BASE_URL}${url}${serializeQuery(options.params)}`;
    const init: FetchRequestInit = { method, headers };
    if (options.data !== undefined) {
      init.body =
        typeof options.data === 'string'
          ? options.data
          : JSON.stringify(options.data);
    }

    const response = await fetch(fullUrl, init);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new PaystackHttpError(response.status, body);
    }
    return (await response.json()) as T;
  }

  return {
    get: <T>(url: string, options?: HttpRequestOptions): Promise<T> =>
      send<T>(url, 'GET', options),
    post: <T>(url: string, data?: unknown): Promise<T> =>
      send<T>(url, 'POST', { data }),
    put: <T>(url: string, data?: unknown): Promise<T> =>
      send<T>(url, 'PUT', { data }),
    patch: <T>(url: string, data?: unknown): Promise<T> =>
      send<T>(url, 'PATCH', { data }),
    delete: <T>(url: string, options?: HttpRequestOptions): Promise<T> =>
      send<T>(url, 'DELETE', options),
    request: <T>(config: HttpRequestConfig): Promise<T> =>
      send<T>(config.url, config.method.toUpperCase(), {
        params: config.params,
        data: config.data,
      }),
  };
}
