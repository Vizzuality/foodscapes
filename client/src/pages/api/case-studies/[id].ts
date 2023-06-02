import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import { CaseStudy } from 'types/case-studies';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (id) => {
  const SQL = KNEX.select(
    'f.id AS id',
    'f.slug',
    'f.title',
    'f.bbox',
    'f.geometry_geojson AS geojson'
  )
    .from('case_studies AS f')
    .where({ 'f.id': id });

  return API.request<CaseStudy>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      json: ['bbox', 'geojson'],
      size: 'max',
    }),
  }).then((response) => response.data);
};

const CaseStudyId = async (
  req: NextApiRequest,
  res: NextApiResponse<CaseStudy | { error: string }>
) => {
  try {
    const { id } = req.query;
    const result = await fetch(id);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default CaseStudyId;
