import { useRef } from 'react';

import { UseQueryResult } from '@tanstack/react-query';

export function useIsLoading(queries: UseQueryResult[]) {
  return {
    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    isFetched: queries.every((query) => query.isFetched),
  };
}

export function useElementById(id: string) {
  const ref = useRef<HTMLElement | null>(null);
  const { document } = globalThis;

  if (document) {
    ref.current = document.getElementById(id);
  }

  return ref;
}
