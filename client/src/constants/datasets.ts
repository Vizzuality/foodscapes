import squel from 'squel';

import { Dataset } from 'types/datasets';

export const DATASETS = [
  {
    id: 'foodscapes',
    label: 'Foodscapes',
    group: 'foodscapes',
    layer: {
      enabled: true,
      visible: true,
      band: 1,
    },
    widget: {
      enabled: false,
      sql: squel
        .select()
        .field('foodscapes', 'id')
        .field('soil_groups', 'parent_id')
        .field('COUNT(pixel_count)', 'value')
        .distinct()
        .from('data')
        .where('foodscapes NOT IN (1,2,3)')
        .group('foodscapes'),
    },
  },
  {
    id: 'foodscapes-intensities',
    label: 'Foodscapes Intensity',
    group: 'foodscapes',
    layer: {
      enabled: true,
      visible: true,
      band: 3,
    },
    widget: {
      enabled: false,
      sql: squel
        .select()
        .field('intensity_groups', 'id')
        .field('COUNT(pixel_count)', 'value')
        .distinct()
        .from('data')
        .where('intensity_groups NOT IN (0)')
        .group('intensity_groups'),
    },
  },
  {
    id: 'crops',
    label: 'Crops',
    group: 'foodscapes',
    layer: {
      enabled: true,
      visible: true,
      band: 4,
    },
    widget: {
      enabled: false,
      sql: squel
        .select()
        .field('crops', 'id')
        .field('crop_groups', 'parent_id')
        .field('COUNT(pixel_count)', 'value')
        .distinct()
        .from('data')
        .where('crops NOT IN (-9999)')
        .group('crops'),
    },
  },

  // RISKS
  {
    id: 'land-use-change',
    label: 'Land Use Change',
    group: 'risks',
    layer: {
      enabled: true,
      visible: true,
    },
    widget: {
      enabled: false,
    },
  },
  {
    id: 'climate-change-climate-risk',
    label: 'Climate change (climate risk)',
    group: 'risks',
    layer: {
      enabled: false,
      visible: true,
    },
    widget: {
      enabled: false,
    },
  },
  {
    id: 'pollution-pesticide-risk',
    label: 'Pollution (pesticide risk)',
    group: 'risks',
    layer: {
      enabled: false,
      visible: true,
    },
    widget: {
      enabled: false,
    },
  },

  // OPPORTUNITIES
  {
    id: 'restoration',
    label: 'Restoration',
    group: 'opportunities',
    layer: {
      enabled: false,
      visible: true,
    },
    widget: {
      enabled: false,
    },
  },
  {
    id: 'agroforestry',
    label: 'Agroforestry',
    group: 'opportunities',
    layer: {
      enabled: false,
      visible: true,
    },
    widget: {
      enabled: false,
    },
  },
  {
    id: 'soil-health-management-cover-crops-area',
    label: 'Soil Health Management (cover crops area)',
    group: 'opportunities',
    layer: {
      enabled: false,
      visible: true,
    },
    widget: {
      enabled: false,
    },
  },
  {
    id: 'provinces',
    label: 'Provinces',
    group: 'other',
    layer: {
      enabled: true,
      visible: false,
      band: 34,
    },
    widget: {
      enabled: false,
    },
  },
] as Dataset[];
