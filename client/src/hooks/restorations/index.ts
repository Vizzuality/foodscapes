import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Restoration } from 'types/restorations';

import API from 'services/api';

export function useRestorations(queryOptions: UseQueryOptions<Restoration[], unknown> = {}) {
  const fetchRestorations = () => {
    return API.request({
      method: 'GET',
      url: '/restorations',
    }).then((response) => response.data);
  };

  const query = useQuery(['restorations'], fetchRestorations, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
