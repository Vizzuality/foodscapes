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
  .field('f.iso')
  .field('f.bbox');

export function useCountries(queryOptions: UseQueryOptions<Country[], unknown> = {}) {
  const fetchCountries = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
        json: ['bbox'],
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

export function useCountry(id, queryOptions: UseQueryOptions<Country, unknown> = {}) {
  const fetchCountry = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL
          //
          .clone()
          .field('f.geometry_geojson', 'geojson')
          .where('f.value = ?', id),
        shape: 'array',
        size: 'max',
        json: ['bbox', 'geojson'],
      }),
    }).then((response) => response.data);
  };

  const query = useQuery(['country', id], fetchCountry, {
    placeholderData: {},
    enabled: !!id,
    keepPreviousData: false,
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return {};
    }

    return data[0];
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    } as typeof query;
  }, [query, DATA]);
}
