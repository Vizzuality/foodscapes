import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';

import { FiltersProps, CropData } from 'types/data';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (filters: FiltersProps) => {
  const SQL = KNEX
    //
    .select('d.crops AS id', 'd.crop_groups AS parent_id')
    .sum('d.pixel_count AS value')
    .distinct()
    .from('data AS d')
    .whereNotIn('d.crops', [-9999])
    .groupBy('d.crops');

  return API.request<CropData[]>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      ...filters,
    }),
  }).then((response) => response.data);
};

const CropsData = async (
  req: NextApiRequest,
  res: NextApiResponse<CropData[] | { error: string }>
) => {
  try {
    const filters = qs.parseUrl(req.url, {
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

export default CropsData;
