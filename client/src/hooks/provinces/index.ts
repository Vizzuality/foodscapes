import { useMemo } from 'react';

import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import squel from 'squel';

import { Province } from 'types/provinces';

import API from 'services/api';

const provinces = squel.select().from('provinces');
const countries = squel.select().from('countries');

const SQL = squel
  .select()
  .from(provinces, 'f')
  .left_join(countries, 's', 'f.parent_id = s.value')
  .field('f.value', 'id')
  .field('f.value')
  .field('f.label')
  .field('f.iso')
  .field('json_extract(f.bbox,"$") as bbox')
  .field('f.parent_id', 'parentId')
  .field('s.label', 'parentLabel')
  .field('s.iso', 'parentIso');

export function useProvinces(id, queryOptions: UseQueryOptions<Province[], unknown> = {}) {
  const fetchProvinces = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL.clone().where('s.value = ?', id),
        shape: 'array',
        size: 'max',
        json: 'bbox',
      }),
    }).then((response) => response.data);
  };

  const query = useQuery(['provinces', id], fetchProvinces, {
    placeholderData: [],
    enabled: !!id,
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

export function useProvince(id, queryOptions: UseQueryOptions<Province, unknown> = {}) {
  const fetchProvince = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL.clone().where('f.value = ?', id),
        shape: 'array',
        size: 'max',
        json: 'bbox',
      }),
    }).then((response) => response.data);
  };

  const query = useQuery(['province', id], fetchProvince, {
    placeholderData: {},
    enabled: !!id,
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
