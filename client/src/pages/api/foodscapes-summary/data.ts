import { DatasetteParamsProps, datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (params: DatasetteParamsProps) => {
  const SQL = KNEX
    //
    .countDistinct('d.foodscapes', { as: 'total_foodscapes' })
    .countDistinct('d.country', { as: 'total_countries' })
    .sum('d.pixel_count', { as: 'total_pixels' })
    .from('data AS d')
    .whereNotIn('d.foodscapes', [1, 2, 3]);

  return API.request({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      ...params,
    }),
  }).then((response) => response.data);
};

const FoodscapesData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = qs.parseUrl(decodeURIComponent(req.url), {
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: 'bracket-separator',
    }).query as DatasetteParamsProps;

    const result = await fetch(params);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default FoodscapesData;
