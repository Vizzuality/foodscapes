import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { group } from 'd3-array';

import { Crop, CropGroup } from 'types/crops';

import API from 'services/api';

export function useCrops(queryOptions: UseQueryOptions<Crop[], unknown> = {}) {
  const fetchCrops = () => {
    return API.request({
      method: 'GET',
      url: '/crops',
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
      url: '/crops',
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
      ([id, value]) =>
        ({
          id,
          value: id,
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
