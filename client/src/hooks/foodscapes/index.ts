import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Foodscape } from 'types/foodscapes';

import DATA_JSON from './data.json';

// import API from 'services/api';

export function useFoodscapes(queryOptions: UseQueryOptions<Foodscape[], unknown> = {}) {
  const fetchFoodscapes = () =>
    new Promise((resolve) => {
      resolve(DATA_JSON);
    });

  // API.request({
  //   method: 'GET',
  //   url: '/foodscapes',
  // }).then((response) => response.data);

  const query = useQuery(['foodscapes'], fetchFoodscapes, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((d) => ![1, 2, 3].includes(d.value));
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    } as typeof query;
  }, [query, DATA]);
}
