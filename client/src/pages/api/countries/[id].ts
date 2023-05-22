import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Country } from 'types/countries';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (id) => {
  const SQL = KNEX
    //
    .select(
      'f.value AS id',
      'f.value',
      'f.label',
      'f.iso',
      'f.bbox',
      'f.geometry_geojson AS geojson'
    )
    .from('countries AS f')
    .where({ 'f.value': id });

  return API.request<Country[]>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      json: ['bbox', 'geojson'],
    }),
  }).then((response) => response.data);
};

const CountriesId = async (
  req: NextApiRequest,
  res: NextApiResponse<Country | { error: string }>
) => {
  try {
    const { id } = req.query;
    const result = await fetch(id);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default CountriesId;
