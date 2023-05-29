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
          '(SUM(CASE WHEN d.critically_endangered_ecosystems = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
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
          '(SUM(CASE WHEN d.area_with_high_conservation_value = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
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
          '(SUM(CASE WHEN d.agricultural_frontier_zones = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
    KNEX
      //
      .select(KNEX.raw("'soil_erosion' AS id"))
      .select(KNEX.raw('SUM(CASE WHEN d.soil_erosion = 1 THEN d.pixel_count ELSE 0 END) AS value'))
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.soil_erosion = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
    KNEX
      //
      .select(KNEX.raw("'water_scarcity' AS id"))
      .select(
        KNEX.raw('SUM(CASE WHEN d.water_scarcity = 1 THEN d.pixel_count ELSE 0 END) AS value')
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.water_scarcity = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
  ];

  return API.request({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      ...filters,
    }),
  }).then((response) => response.data);
};

const LandUseRisksData = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default LandUseRisksData;
