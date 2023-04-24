import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { FoodscapeIntensity } from 'types/foodscapes-intensities';

import DATA_JSON from './data.json';

// import API from 'services/api';

export function useFoodscapesIntensities(
  queryOptions: UseQueryOptions<FoodscapeIntensity[], unknown> = {}
) {
  const fetchFoodscapesIntensities = () =>
    new Promise((resolve) => {
      resolve(DATA_JSON);
    });

  // API.request({
  //   method: 'GET',
  //   url: '/foodscapes',
  // }).then((response) => response.data);

  const query = useQuery(['foodscapes-intensities'], fetchFoodscapesIntensities, {
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
