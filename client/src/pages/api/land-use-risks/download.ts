import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async () => {
  const SQL = [
    KNEX
      //
      .select(KNEX.raw("'critically_endangered_ecosystems' AS id"))
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.critically_endangered_ecosystems = 1 THEN d.pixel_count ELSE 0 END) AS value'
        )
      )
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.critically_endangered_ecosystems = 1 THEN d.pixel_count * 3086.9136 ELSE 0 END) AS ha'
        )
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.critically_endangered_ecosystems = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d'),
    KNEX
      //
      .select(KNEX.raw("'area_with_high_conservation_value' AS id"))
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.area_with_high_conservation_value = 1 THEN d.pixel_count ELSE 0 END) AS value'
        )
      )
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.area_with_high_conservation_value = 1 THEN d.pixel_count * 3086.9136 ELSE 0 END) AS ha'
        )
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.area_with_high_conservation_value = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d'),
    KNEX
      //
      .select(KNEX.raw("'agricultural_frontier_zones' AS id"))
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.agricultural_frontier_zones = 1 THEN d.pixel_count ELSE 0 END) AS value'
        )
      )
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.agricultural_frontier_zones = 1 THEN d.pixel_count * 3086.9136 ELSE 0 END) AS ha'
        )
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.agricultural_frontier_zones = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d'),
    KNEX
      //
      .select(KNEX.raw("'soil_erosion' AS id"))
      .select(KNEX.raw('SUM(CASE WHEN d.soil_erosion = 1 THEN d.pixel_count ELSE 0 END) AS value'))
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.soil_erosion = 1 THEN d.pixel_count * 3086.9136 ELSE 0 END) AS ha'
        )
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.soil_erosion = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d'),
    KNEX
      //
      .select(KNEX.raw("'water_scarcity' AS id"))
      .select(
        KNEX.raw('SUM(CASE WHEN d.water_scarcity = 1 THEN d.pixel_count ELSE 0 END) AS value')
      )
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.water_scarcity = 1 THEN d.pixel_count * 3086.9136 ELSE 0 END) AS ha'
        )
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.water_scarcity = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d'),
  ];

  return API.request({
    method: 'GET',
    url: '/foodscapes.csv',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
    }),
  }).then((response) => response.data);
};

const LandUseRisksDownload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default LandUseRisksDownload;
