import { UseQueryResult } from '@tanstack/react-query';

export function useIsLoading(queries: UseQueryResult[]) {
  return {
    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    isFetched: queries.every((query) => query.isFetched),
  };
}
