import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Foodscape } from 'types/foodscapes';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
});

const fetch = async () => {
  const SQL = KNEX.select(
    'f.value AS id',
    'f.value',
    'f.label',
    'f.color',
    'f.parent_id AS parentId',
    's.label AS parentLabel',
    's.color AS parentColor'
  )
    .from('foodscapes AS f')
    .leftJoin('soil_groups AS s', 'f.parent_id', 's.value')
    .whereNotIn('f.value', [1, 2, 3]);

  return API.request<Foodscape[]>({
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
  res: NextApiResponse<Foodscape[] | { error: string }>
) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default Hello;
