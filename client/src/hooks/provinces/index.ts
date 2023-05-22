import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Province } from 'types/provinces';

import API from 'services/api';

export function useProvinces(id, queryOptions: UseQueryOptions<Province[], unknown> = {}) {
  const fetchProvinces = () => {
    return API.request({
      method: 'GET',
      url: '/provinces',
      params: {
        country: id,
      },
    }).then((response) => response.data);
  };

  const query = useQuery(['provinces', id], fetchProvinces, {
    placeholderData: [],
    enabled: !!id,
    ...queryOptions,
  });

  return query;
}

export function useProvince(id, queryOptions: UseQueryOptions<Province, unknown> = {}) {
  const fetchProvince = () => {
    return API.request({
      method: 'GET',
      url: `/provinces/${id}`,
    }).then((response) => response.data);
  };

  const query = useQuery(['province', id], fetchProvince, {
    enabled: !!id,
    keepPreviousData: false,
    ...queryOptions,
  });

  return query;
}
