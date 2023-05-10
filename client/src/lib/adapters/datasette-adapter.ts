import { Select } from 'squel';

import { FiltersProps } from 'types/data';

import { DATA_JSON as LAND_USER_RISKS_DATA } from 'hooks/land-use-risks';

export interface DatasetteParamsProps extends FiltersProps {
  sql?: Select;
  shape?: 'arrays' | 'objects' | 'array' | 'object';
  size?: number | 'max';
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
    shape = 'array',
    size = 'max',
  } = params;
  const s = sql?.clone();

  // Foodscapes
  if (!!foodscapes.length) {
    s.where('foodscapes IN ?', foodscapes);
  }

  // Intensities
  if (!!intensities?.length) {
    s.where('intensity_groups IN ?', intensities);
  }

  // Intensities
  if (!!crops?.length) {
    s.where('crops IN ?', crops);
  }

  if (!!landUseRisk?.length) {
    const where = LAND_USER_RISKS_DATA
      // Filter the land use risks by the selected ones
      .filter((d) => landUseRisk.includes(d.value))
      .map((d) => `${d.column} = 1`)
      .join(' OR ');

    s.where(where);
  }

  if (!!climateRisk?.length) {
    s.where('climate_risk == ?', climateRisk[0]);
  }

  if (!!pollutionRisk?.length) {
    s.where('pesticide_risk == ?', pollutionRisk[0]);
  }

  return {
    // SQL
    sql: s?.toString(),
    // Shape
    _shape: shape,
    // Size
    _size: size,
  };
}
