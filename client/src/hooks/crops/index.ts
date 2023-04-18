import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Crop } from 'types/crops';

import DATA_JSON from './data.json';

// import API from 'services/api';

export function useCrops(queryOptions: UseQueryOptions<Crop[], unknown> = {}) {
  const fetchCrops = () =>
    new Promise((resolve) => {
      resolve(DATA_JSON);
    });

  // API.request({
  //   method: 'GET',
  //   url: '/crops',
  // }).then((response) => response.data);

  const query = useQuery(['crops'], fetchCrops, {
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
