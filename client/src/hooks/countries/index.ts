import { useMemo } from 'react';

import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import squel from 'squel';

import { Country } from 'types/countries';

import API from 'services/api';

const SQL = squel
  .select()
  .from('countries', 'f')
  .field('f.value', 'id')
  .field('f.value')
  .field('f.label')
  .field('f.iso');

export function useCountries(queryOptions: UseQueryOptions<Country[], unknown> = {}) {
  const fetchCountries = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
      }),
    }).then((response) => response.data);
  };

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
