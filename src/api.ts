/**
 * RARE Resilient API Client
 * Gracefully handles server startup delays, network retries, and offline fallbacks
 * without throwing unhandled console errors.
 */

export async function safeFetch<T>(
  url: string,
  options?: RequestInit,
  fallback?: T,
  retries = 2
): Promise<T | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch {
      if (i < retries) {
        await new Promise((r) => setTimeout(r, 300 * (i + 1)));
      }
    }
  }
  return fallback !== undefined ? fallback : null;
}

export async function safePost<T>(
  url: string,
  body?: any,
  fallback?: T
): Promise<T | null> {
  return safeFetch<T>(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    },
    fallback,
    1
  );
}
