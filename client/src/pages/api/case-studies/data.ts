import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';

import { FiltersProps } from 'types/data';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (filters: FiltersProps) => {
  const SQL = KNEX
    //
    .select('case_studies AS id')
    .distinct()
    .from('data')
    .whereNotIn('case_studies', [-9999])
    .groupBy('case_studies');
  console.log(SQL.toString());
  return API.request({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      size: 'max',
      ...filters,
    }),
  }).then((response) => response.data);
};

const CaseStudiesData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filters = qs.parseUrl(decodeURIComponent(req.url), {
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

export default CaseStudiesData;
