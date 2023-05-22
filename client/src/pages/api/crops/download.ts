import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async () => {
  const SQL = KNEX
    //
    .select(
      'd.crops AS id',
      'f.label',
      'f.color',
      'd.crop_groups as parentId',
      'g.label as parentLabel',
      'g.color as parentColor',
      KNEX.raw('SUM(d.pixel_count) as value'),
      KNEX.raw('SUM(d.pixel_count * 3086.9136) as ha'),
      // percentage
      KNEX.raw(
        'ROUND((SUM(d.pixel_count * 3086.9136) / (SELECT SUM(pixel_count * 3086.9136) FROM data WHERE crops NOT IN (-9999))) * 100, 2) as percentage'
      )
    )
    .distinct()
    .from('data AS d')
    .whereNotIn('d.crops', [-9999])
    .groupBy('d.crops')
    .leftJoin('crops AS f', 'd.crops', 'f.value')
    .leftJoin('crop_groups AS g', 'd.crop_groups', 'g.value');

  return API.request({
    method: 'GET',
    url: '/foodscapes.csv',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
    }),
    headers: {
      'Content-Type': 'text/csv',
    },
  }).then((response) => response.data);
};

const CropssDownload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default CropssDownload;
