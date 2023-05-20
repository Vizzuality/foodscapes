import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { FoodscapeIntensity } from 'types/foodscapes-intensities';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async () => {
  const SQL = KNEX
    //
    .select('f.value AS id', 'f.value', 'f.label', 'f.color')
    .from('intensity_groups AS f');

  return API.request<FoodscapeIntensity[]>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
    }),
  }).then((response) => response.data);
};

const Hello = async (
  req: NextApiRequest,
  res: NextApiResponse<FoodscapeIntensity[] | { error: string }>
) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default Hello;
