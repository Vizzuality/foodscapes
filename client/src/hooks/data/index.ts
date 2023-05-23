import { useMemo } from 'react';

import { DatasetteParamsProps } from 'lib/adapters/datasette-adapter';
import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { FiltersProps, PointData } from 'types/data';
import { Dataset } from 'types/datasets';
import { LngLat } from 'types/map';

import API from 'services/api';
import TITILER_API from 'services/titiler';

export const fetchData = (id: Dataset['id'], params: DatasetteParamsProps) => {
  return API.request({
    method: 'GET',
    url: `${id}/data`,
    params,
  }).then((response) => response.data);
};

export const downloadData = (id: Dataset['id']) => {
  return API.request({
    method: 'GET',
    url: `${id}/download`,
    headers: {
      'Content-Type': 'text/csv',
    },
  }).then((response) => response.data);
};

export const fetchStatisticsData = (band: number, filters: FiltersProps) => {
  const expression = () => {
    const where = titilerAdapter(filters);

    if (!where) return null;

    return `where(${where},b${band},-1)`;
  };

  return TITILER_API.request({
    method: 'GET',
    url: `/cog/statistics`,
    params: {
      expression: expression(),
      width: 4096,
      height: 4096,
    },
  }).then((response) => response.data[expression()]);
};

export const fetchPointData = ({ lng, lat }: LngLat) => {
  return TITILER_API.request({
    method: 'GET',
    url: `/cog/point/${lng},${lat}`,
  }).then((response) => response.data);
};

export function useData<T = unknown>(
  id: Dataset['id'],
  params: DatasetteParamsProps = {},
  queryOptions: UseQueryOptions<T[], unknown> = {}
) {
  const fetch = () => fetchData(id, params);

  const query = useQuery(['data', JSON.stringify({ id, ...params })], fetch, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}

// Download data
export function useDownloadData() {
  const fetch = (id: Dataset['id']) => downloadData(id);

  const mutation = useMutation<string, unknown, Dataset['id']>(fetch);

  return mutation;
}

export function useStatisticsData(
  params: { band: number; filters: FiltersProps },
  queryOptions: UseQueryOptions<any, unknown> = {}
) {
  const fetch = () => fetchStatisticsData(params.band, params.filters);

  const query = useQuery(['data', JSON.stringify({ ...params })], fetch, {
    placeholderData: {},
    enabled: !!params.band,
    keepPreviousData: false,
    ...queryOptions,
  });

  return query;
}

// Point data
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
    if (!data) return {};
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
