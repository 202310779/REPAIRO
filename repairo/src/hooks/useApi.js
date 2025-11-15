"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import RequestService from "../services/requestService";

// Simple, generic data fetching hook
// Usage: const {data, loading, error, refetch} = useApi({endpoint: '/repairs'})
export function useApi({
  endpoint,
  method = "GET",
  body,
  params,
  immediate = true,
  withAuth = true,
  // allow passing additional deps that should trigger a refresh
  deps = [],
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const run = useCallback(async () => {
    if (!endpoint) return;
    setLoading(true);
    setError(null);
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const result = await RequestService.request(endpoint, {
        method,
        body,
        params,
        withAuth,
        signal: abortRef.current.signal,
      });
      setData(result);
    } catch (err) {
      // swallow abort errors
      if (err.name !== "AbortError") setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    endpoint,
    method,
    JSON.stringify(body),
    JSON.stringify(params),
    withAuth,
  ]);

  useEffect(() => {
    if (immediate) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, ...deps]);

  const refetch = useCallback(() => run(), [run]);

  return { data, loading, error, refetch };
}

export default useApi;
