import { useMemo } from 'react';

import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { group } from 'd3-array';
import squel from 'squel';

import { Foodscape, FoodscapeGroup } from 'types/foodscapes';

import API from 'services/api';

const foodscapes = squel.select().from('foodscapes').where('value NOT IN ?', [1, 2, 3]);
const foodscapesGroups = squel.select().from('soil_groups');

const SQL = squel
  .select()
  .from(foodscapes, 'f')
  .left_join(foodscapesGroups, 's', 'f.parent_id = s.value')
  .field('f.value', 'id')
  .field('f.value')
  .field('f.label')
  .field('f.color')
  .field('f.parent_id', 'parentId')
  .field('s.label', 'parentLabel')
  .field('s.color', 'parentColor');

export function useFoodscapes(queryOptions: UseQueryOptions<Foodscape[], unknown> = {}) {
  const fetchFoodscapes = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
      }),
    }).then((response) => response.data);
  };

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

export function useFoodscapesGroups(queryOptions: UseQueryOptions<Foodscape[], unknown> = {}) {
  const fetchFoodscapes = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
      }),
    }).then((response) => response.data);
  };

  const query = useQuery(['foodscapes'], fetchFoodscapes, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo<FoodscapeGroup[]>(() => {
    if (!data) {
      return [];
    }

    return Array.from(
      group(
        data
          .filter((d) => ![1, 2, 3].includes(d.value))
          .sort((a, b) => a.label.localeCompare(b.label)),
        (d) => d.parentId
      ),
      ([key, value]) =>
        ({
          key,
          value: key,
          values: value,
          label: value.map((v) => v.parentLabel).reduce((_, v) => v, ''),
          color: value.map((v) => v.parentColor).reduce((_, v) => v, ''),
        } satisfies FoodscapeGroup)
    );
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
