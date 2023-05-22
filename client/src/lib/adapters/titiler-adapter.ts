import { FiltersProps } from 'types/data';

export function titilerAdapter(params: FiltersProps = {}, initial = null) {
  const {
    foodscapes = [],
    intensities = [],
    crops = [],
    landUseRisk = [],
    climateRisk = [],
    pollutionRisk = [],
    country,
    province,
  } = params;

  return [
    ...[[1, 2, 3].map((v) => `(b1!=${v})`).join('&')], // Remove foodscapes 1, 2, 3 always from map
    ...(initial ? [initial] : []),
    ...(foodscapes.length ? [foodscapes.map((v) => `(b1==${v})`).join('|')] : []),
    ...(intensities.length ? [intensities.map((v) => `(b3==${v})`).join('|')] : []),
    ...(crops.length ? [crops.map((v) => `(b4==${v})`).join('|')] : []),
    ...(landUseRisk.length ? [landUseRisk.map((v) => `(b${v}==1)`).join('|')] : []),
    ...(climateRisk.length ? [climateRisk.map((v) => `(b11==${v})`).join('|')] : []),
    ...(pollutionRisk.length ? [pollutionRisk.map((v) => `(b12==${v})`).join('|')] : []),
    ...(country ? [`(b34==${country})`] : []),
    ...(province ? [`(b35==${province})`] : []),
  ]
    .map((v) => `(${v})`)
    .join('&');
}
