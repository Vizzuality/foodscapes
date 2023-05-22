import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Province } from 'types/provinces';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

// const SQL = squel
//   .select()
//   .from(provinces, 'f')
//   .left_join(countries, 's', 'f.parent_id = s.value')
//   .field('f.value', 'id')
//   .field('f.value')
//   .field('f.label')
//   .field('f.iso')
//   .field('f.bbox')
//   .field('f.parent_id', 'parentId')
//   .field('s.label', 'parentLabel')
//   .field('s.iso', 'parentIso');

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
      's.label AS parentLabel',
      's.iso AS parentIso'
    )
    .from('provinces AS f')
    .where({ 'f.parent_id': cid })
    .leftJoin('countries AS s', 'f.parent_id', 's.value');

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
