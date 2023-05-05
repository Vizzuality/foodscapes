import { useMemo } from 'react';

import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import squel from 'squel';

import { RisksClimateChange } from 'types/risks-climate-change';

import API from 'services/api';

const SQL = squel
  .select()
  .field('SUM(CASE WHEN climate_risk = 1 THEN pixel_count ELSE 0 END)', 'risked')
  .field('SUM(CASE WHEN climate_risk = 0 THEN pixel_count ELSE 0 END)', 'not_risked');

export function useRisksClimateChange(queryOptions = {}) {
  console.log({ queryOptions });
  const fetchRisksClimateChange = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes.json',
      params: datasetteAdapter({
        sql: SQL,
        shape: 'array',
      }),
    }).then((response) => response.data);
  };

  const query = useQuery(['climate-change-climate-risk'], fetchRisksClimateChange, {
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
