import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { group } from 'd3-array';

import { Foodscape, FoodscapeGroup } from 'types/foodscapes';

import API from 'services/api';

export function useIrrecoverableCarbon(queryOptions: UseQueryOptions<Foodscape[], unknown> = {}) {
  const fetchIrrecoverableCarbon = () => {
    return API.request({
      method: 'GET',
      url: '/irrecoverable_carbon',
    }).then((response) => response.data);
  };

  const query = useQuery(['irrecoverable-carbon'], fetchIrrecoverableCarbon, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;
  console.log({ data });

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

export function useIrrecoverableCarbonGroups(
  queryOptions: UseQueryOptions<Foodscape[], unknown> = {}
) {
  const fetchIrrecoverableCarbon = () => {
    return API.request({
      method: 'GET',
      url: '/irrecoverable_carbon',
    }).then((response) => response.data);
  };

  const query = useQuery(['irrecoverable-carbon'], fetchIrrecoverableCarbon, {
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
          id: key,
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
