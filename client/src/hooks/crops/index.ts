import { useMemo } from 'react';

import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { group } from 'd3-array';
import squel from 'squel';

import { Crop, CropGroup } from 'types/crops';

import API from 'services/api';

const crops = squel.select().from('crops');
const cropsGroups = squel.select().from('crop_groups');

const SQL = squel
  .select()
  .from(crops, 'f')
  .left_join(cropsGroups, 's', 'f.parent_id = s.value')
  .field('f.value', 'id')
  .field('f.value')
  .field('f.label')
  .field('f.color')
  .field('f.parent_id', 'parentId')
  .field('s.label', 'parentLabel')
  .field('s.color', 'parentColor');

export function useCrops(queryOptions: UseQueryOptions<Crop[], unknown> = {}) {
  const fetchCrops = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
      }),
    }).then((response) => response.data);
  };

  const query = useQuery(['crops'], fetchCrops, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.sort((a, b) => {
      return a.value - b.value;
    });
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    } as typeof query;
  }, [query, DATA]);
}

export function useCropsGroups(queryOptions: UseQueryOptions<Crop[], unknown> = {}) {
  const fetchCrops = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
      }),
    }).then((response) => response.data);
  };

  const query = useQuery(['crops'], fetchCrops, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo<CropGroup[]>(() => {
    if (!data) {
      return [];
    }

    return Array.from(
      group(
        data.sort((a, b) => a.label.localeCompare(b.label)),
        (d) => d.parentId
      ),
      ([key, value]) =>
        ({
          key,
          value: key,
          values: value,
          label: value.map((v) => v.parentLabel).reduce((_, v) => v, ''),
          color: value.map((v) => v.parentColor).reduce((_, v) => v, ''),
        } satisfies CropGroup)
    );
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
