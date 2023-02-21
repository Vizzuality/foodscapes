import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Foodscape } from 'types/foodscapes';

import DATA_JSON from './data.json';

// import API from 'services/api';

export function useFoodscapes(queryOptions: UseQueryOptions<Foodscape[], unknown> = {}) {
  const fetchFoodscapes = () =>
    Promise.resolve({
      data: DATA_JSON,
    }).then((response) => response.data);
  // API.request({
  //   method: 'GET',
  //   url: '/foodscapes',
  // }).then((response) => response.data);

  const query = useQuery(['foodscapes'], fetchFoodscapes, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.sort((a, b) => {
      return a.label > b.label ? 1 : -1;
    });
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
