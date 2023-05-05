import { DefinedUseQueryResult } from '@tanstack/react-query';

export function useIsLoading(queries: DefinedUseQueryResult[]) {
  return {
    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    isFetched: queries.every((query) => query.isFetched),
  };
}

export function convertPixelCountToHA(value: number, factor = 1) {
  return (value * 3086.9136) / factor;
}
