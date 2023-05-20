import { Knex } from 'knex';

import { FiltersProps } from 'types/data';

import { DATA_JSON as LAND_USER_RISKS_DATA } from 'hooks/land-use-risks';

export interface DatasetteParamsProps extends FiltersProps {
  sql?: Knex.QueryBuilder | Knex.QueryBuilder[];
  shape?: 'arrays' | 'objects' | 'array' | 'object';
  size?: number | 'max';
  json?: string[];
}

export function datasetteAdapter(params: DatasetteParamsProps = {}) {
  const {
    sql,
    foodscapes = [],
    intensities = [],
    crops = [],
    landUseRisk = [],
    climateRisk = [],
    pollutionRisk = [],
    country,
    province,
    shape = 'array',
    size = 'max',
    json,
  } = params;

  const SQL = Array.isArray(sql) ? sql : [sql];

  const s = SQL.reduce((acc, query) => {
    if (!!foodscapes.length) {
      query.whereIn('foodscapes', foodscapes);
    }

    // Intensities
    if (!!intensities?.length) {
      query.whereIn('intensity_groups', intensities);
    }

    // Intensities
    if (!!crops?.length) {
      query.whereIn('crops', crops);
    }

    // Country
    if (!!country) {
      query.where({ country });
    }

    // Province
    if (!!province) {
      query.where({ province });
    }

    if (!!landUseRisk?.length) {
      const where = LAND_USER_RISKS_DATA
        // Filter the land use risks by the selected ones
        .filter((d) => landUseRisk.includes(d.value))
        .map((d) => `${d.column} = 1`)
        .join(' OR ');

      query.where(where);
    }

    if (!!climateRisk?.length) {
      query.where('climate_risk == ?', climateRisk[0] === -1 ? 0 : climateRisk[0]);
    }

    if (!!pollutionRisk?.length) {
      query.where('pesticide_risk == ?', pollutionRisk[0] === -1 ? 0 : pollutionRisk[0]);
    }

    if (acc) {
      return acc.union(query);
    }

    return query;
  }, null as Knex.QueryBuilder);

  return {
    // SQL
    sql: s.toString(),
    // Shape
    _shape: shape,
    // Size
    _size: size,
    // JSON
    ...(json && { _json: json }),
  };
}
