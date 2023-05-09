import { FiltersProps } from 'types/data';

export function titilerAdapter(params: FiltersProps = {}) {
  const {
    foodscapes = [],
    intensities = [],
    crops = [],
    climateRisk = [],
    country,
    province,
  } = params;

  return [
    ...(foodscapes.length ? [foodscapes.map((v) => `(b1==${v})`).join('|')] : []),
    ...(intensities.length ? [intensities.map((v) => `(b3==${v})`).join('|')] : []),
    ...(crops.length ? [crops.map((v) => `(b4==${v})`).join('|')] : []),
    ...(climateRisk.length ? [climateRisk.map((v) => `(b11==${v})`).join('|')] : []),
    ...(country ? [`(b31==${location})`] : []),
    ...(province ? [`(b32==${location})`] : []),
  ]
    .map((v) => `(${v})`)
    .join('&');
}
