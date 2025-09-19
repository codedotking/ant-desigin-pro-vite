import { useState, useEffect } from 'react';

interface UseRequestResult<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

export function useRequest<T>(requestFn: () => Promise<T>): UseRequestResult<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const result = await requestFn();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [requestFn]);

  return { data, loading, error };
}
