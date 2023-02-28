import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Province } from 'types/provinces';

import DATA_JSON from './data.json';

// import API from 'services/api';

export function useProvinces(queryOptions: UseQueryOptions<Province[], unknown> = {}) {
  const fetchProvinces = () =>
    new Promise((resolve) => {
      resolve(DATA_JSON);
    });

  // API.request({
  //   method: 'GET',
  //   url: '/provinces',
  // }).then((response) => response.data);

  const query = useQuery(['provinces'], fetchProvinces, {
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
