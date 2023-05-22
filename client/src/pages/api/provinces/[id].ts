import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Province } from 'types/provinces';

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
    .from('provinces AS f')
    .where({ 'f.value': id });

  return API.request<Province[]>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      json: ['bbox', 'geojson'],
    }),
  }).then((response) => response.data);
};

const ProvincesId = async (
  req: NextApiRequest,
  res: NextApiResponse<Province | { error: string }>
) => {
  try {
    const { id } = req.query;
    const result = await fetch(id);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default ProvincesId;
