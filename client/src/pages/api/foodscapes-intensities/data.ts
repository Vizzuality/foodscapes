// .select()
// .field('intensity_groups', 'id')
// .field('SUM(pixel_count)', 'value')
// .distinct()
// .from('data')
// .where('intensity_groups NOT IN (0)')
// .group('intensity_groups'),
import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';

import { FiltersProps, FoodscapeIntensityData } from 'types/data';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (filters: FiltersProps) => {
  const SQL = KNEX
    //
    .select('d.intensity_groups AS id')
    .sum('d.pixel_count AS value')
    .distinct()
    .from('data AS d')
    .whereNotIn('d.intensity_groups', [0])
    .groupBy('d.intensity_groups');

  return API.request<FoodscapeIntensityData[]>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      ...filters,
    }),
  }).then((response) => response.data);
};

const FoodscapeIntensitiesData = async (
  req: NextApiRequest,
  res: NextApiResponse<FoodscapeIntensityData[] | { error: string }>
) => {
  try {
    const filters = qs.parseUrl(req.url, {
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: 'bracket-separator',
    }).query as FiltersProps;

    const result = await fetch(filters);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default FoodscapeIntensitiesData;
