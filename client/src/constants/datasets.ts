import { Dataset } from 'types/datasets';

export const DATASETS = [
  {
    id: 'foodscapes',
    label: 'Foodscapes',
    group: 'foodscapes',
    layer: {
      enabled: true,
    },
    widget: {
      enabled: false,
      sql: `SELECT DISTINCT foodscapes as id, soil_groups, COUNT(pixel_count) AS value
      FROM foodscapes
      WHERE foodscapes NOT IN (1,2,3)
      GROUP BY foodscapes, soil_groups`,
    },
  },
  {
    id: 'soil-groups',
    label: 'Soil Groups',
    group: 'foodscapes',
    layer: {
      enabled: true,
    },
    widget: {
      enabled: false,
    },
  },
  {
    id: 'foodscapes-intensities',
    label: 'Foodscapes Intensity',
    group: 'foodscapes',
    layer: {
      enabled: true,
    },
    widget: {
      enabled: false,
      sql: `SELECT DISTINCT intensity_groups as id, COUNT(pixel_count) AS value
      FROM foodscapes
      WHERE intensity_groups NOT IN (0)
      GROUP BY intensity_groups`,
    },
  },
  {
    id: 'crops',
    label: 'Crops',
    group: 'foodscapes',
    layer: {
      enabled: true,
    },
    widget: {
      enabled: false,
    },
  },
  {
    id: 'crop-groups',
    label: 'Crop Groups',
    group: 'foodscapes',
    layer: {
      enabled: true,
    },
    widget: {
      enabled: false,
    },
  },

  // RISKS
  {
    id: 'land-use-change',
    label: 'Land Use Change',
    group: 'risks',
    layer: {
      enabled: true,
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
    },
    widget: {
      enabled: false,
    },
  },
] as Dataset[];
