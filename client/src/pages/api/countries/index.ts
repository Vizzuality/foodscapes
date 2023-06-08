import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Country } from 'types/countries';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async () => {
  const SQL = KNEX
    //
    .select('f.value AS id', 'f.value', 'f.label', 'f.iso', 'f.bbox')
    .from('countries AS f')
    .join('data AS d', 'f.value', 'd.country')
    .distinct('f.value');

  return API.request<Country[]>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      json: ['bbox'],
      size: 'max',
    }),
  }).then((response) => response.data);
};

const Countries = async (
  req: NextApiRequest,
  res: NextApiResponse<Country[] | { error: string }>
) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default Countries;
