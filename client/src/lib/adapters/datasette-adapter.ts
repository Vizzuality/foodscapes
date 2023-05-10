import { Select } from 'squel';

import { FiltersProps } from 'types/data';
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
    landUseRisk.forEach((v) => {
      s.where(`${v} == ?`, 1);
    });
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
