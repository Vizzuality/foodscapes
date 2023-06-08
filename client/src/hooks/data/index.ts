import { useMemo } from 'react';

import { DatasetteParamsProps } from 'lib/adapters/datasette-adapter';
import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { useMutation, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { FiltersProps, PointData } from 'types/data';
import { Dataset } from 'types/datasets';
import { LngLat } from 'types/map';

import API from 'services/api';
import TITILER_API from 'services/titiler';

function convertNumbersInObject(obj: Record<string, any>): Record<string, any> {
  const convertedObj: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const numberRegex = /^-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?$/;

      if (typeof value === 'string' && numberRegex.test(value)) {
        if (value.includes('.')) {
          convertedObj[key] = parseFloat(value);
        } else {
          convertedObj[key] = parseInt(value, 10);
        }
      } else {
        convertedObj[key] = value;
      }
    }
  }

  return convertedObj;
}

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

export const fetchBandData = (band: number) => {
  return TITILER_API.request({
    method: 'GET',
    url: `/cog/foodscapes/info`,
  }).then((response) => {
    const { band_metadata: metadatas } = response.data;

    const metadata = metadatas.find((v: any) => v[0] === `b${band}`);
    return convertNumbersInObject(metadata[1]);
  });
};

export const fetchStatisticsData = (band: number, filters: FiltersProps) => {
  const expression = () => {
    const where = titilerAdapter(filters);

    if (!where) return null;

    return `where(${where},b${band},-1)`;
  };

  return TITILER_API.request({
    method: 'GET',
    url: `/cog/foodscapes/statistics`,
    params: {
      bidx: band,
      expression: expression(),
      width: 4000,
      height: 4000,
    },
  }).then((response) => response.data[`b${band}`]);
};

export const fetchPointData = ({
  lng,
  lat,
  cog = '/cog/foodscapes',
}: { cog?: string } & LngLat) => {
  return TITILER_API.request({
    method: 'GET',
    url: `${cog}/point/${lng},${lat}`,
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

export function useBand(
  params: { band: number },
  queryOptions: UseQueryOptions<any, unknown> = {}
) {
  const fetch = () => fetchBandData(params.band);

  const query = useQuery(['band', JSON.stringify({ ...params })], fetch, {
    placeholderData: {},
    enabled: !!params.band,
    keepPreviousData: false,
    ...queryOptions,
  });

  return query;
}

export function useStatisticsData(
  params: { band: number; filters: FiltersProps },
  queryOptions: UseQueryOptions<any, unknown> = {}
) {
  const fetch = () => fetchStatisticsData(params.band, params.filters);

  const query = useQuery(['statistics', JSON.stringify({ ...params })], fetch, {
    placeholderData: {},
    enabled: !!params.band,
    keepPreviousData: false,
    ...queryOptions,
  });

  return query;
}

// Point data
export function usePointData(
  params: { cog?: string } & LngLat,
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
    } as UseQueryResult<Record<string, any>, unknown>;
  }, [query, DATA]);
}

export const noPointData = (pointData: Record<string, any>) => {
  return Object.keys(pointData).every((p) => {
    return pointData[p] === 0;
  });
};
