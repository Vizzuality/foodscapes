import { datasetteAdapter } from 'lib/adapters/datasette-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Foodscape } from 'types/foodscapes';

import API from 'services/api';

export const fetchData = (params: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter(params),
  }).then((response) => response.data);
};

export function useData(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<Foodscape[], unknown> = {}
) {
  const fetch = () => fetchData(params);

  const query = useQuery(['data'], fetch, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  return query;
}
