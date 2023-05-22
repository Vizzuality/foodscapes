import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Province } from 'types/provinces';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (cid) => {
  const SQL = KNEX
    //
    .select(
      'f.value AS id',
      'f.value',
      'f.label',
      'f.iso',
      'f.bbox',
      'f.parent_id AS parentId',
      'c.label AS parentLabel',
      'c.iso AS parentIso'
    )
    .from('provinces AS f')
    .where({ 'f.parent_id': cid })
    .leftJoin('countries AS c', 'f.parent_id', 'c.value');

  return API.request<Province[]>({
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
  res: NextApiResponse<Province[] | { error: string }>
) => {
  try {
    const { country } = req.query;
    const result = await fetch(country);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default Countries;
