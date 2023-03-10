import { useMemo } from 'react';

import { datasetteAdapter } from 'lib/adapters/datasette-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { PointData } from 'types/data';
import { LngLat } from 'types/map';

import API from 'services/api';
import TITILER_API from 'services/titiler';

export const fetchData = (params: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter(params),
  }).then((response) => response.data);
};

export const fetchPointData = ({ lng, lat }: LngLat) => {
  return TITILER_API.request({
    method: 'GET',
    url: `/cog/point/${lng},${lat}`,
  }).then((response) => response.data);
};

export function useData<T = unknown>(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<T[], unknown> = {}
) {
  const fetch = () => fetchData(params);

  const query = useQuery(['data', JSON.stringify(params)], fetch, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}

export function usePointData(
  params: LngLat,
  queryOptions: UseQueryOptions<PointData, unknown> = {}
) {
  const fetch = () => fetchPointData(params);

  const query = useQuery(['point-data', JSON.stringify(params)], fetch, {
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) return null;
    return data.band_names.reduce<Record<string, number>>((acc, band, index) => {
      return {
        ...acc,
        [band]: data.values[index],
      };
    }, {});
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    } as typeof query;
  }, [query, DATA]);
}

export const noPointData = (pointData: PointData) => {
  return Object.keys(pointData).every((p) => {
    return pointData[p] === 0;
  });
};
