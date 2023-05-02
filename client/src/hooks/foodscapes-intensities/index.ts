import { useMemo } from 'react';

import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import squel from 'squel';

import { FoodscapeIntensity } from 'types/foodscapes-intensities';

import API from 'services/api';

const SQL = squel
  .select()
  .from('intensity_groups', 'f')
  .field('f.value', 'id')
  .field('f.value')
  .field('f.label')
  .field('f.color');

export function useFoodscapesIntensities(
  queryOptions: UseQueryOptions<FoodscapeIntensity[], unknown> = {}
) {
  const fetchFoodscapesIntensities = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
      }),
    }).then((response) => response.data);
  };

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
