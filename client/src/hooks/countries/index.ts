import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Country } from 'types/countries';

import DATA_JSON from './data.json';

// import API from 'services/api';

export function useCountries(queryOptions: UseQueryOptions<Country[], unknown> = {}) {
  const fetchCountries = () =>
    new Promise((resolve) => {
      resolve(DATA_JSON);
    });

  // API.request({
  //   method: 'GET',
  //   url: '/countries',
  // }).then((response) => response.data);

  const query = useQuery(['countries'], fetchCountries, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    } as typeof query;
  }, [query, DATA]);
}
