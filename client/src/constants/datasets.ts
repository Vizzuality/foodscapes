import squel from 'squel';

import { Dataset } from 'types/datasets';
export const DATASETS = [
  {
    id: 'foodscapes',
    label: 'Foodscapes',
    labelGroup: 'Soil Groups',
    group: 'foodscapes',
    layer: {
      enabled: true,
      visible: true,
      band: 1,
    },
    widget: {
      enabled: true,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
    },
  },
  {
    id: 'foodscapes-summary',
    label: 'Foodscapes Summary',
    group: 'other',
    layer: {
      enabled: false,
      visible: false,
    },
    widget: {
      enabled: true,
      toolbar: {
        download: false,
        info: false,
        layer: false,
      },
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
      enabled: true,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
    },
  },
  {
    id: 'crops',
    label: 'Crops',
    labelGroup: 'Crop Groups',
    group: 'foodscapes',
    layer: {
      enabled: true,
      visible: true,
      band: 4,
    },
    widget: {
      enabled: true,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
    },
  },
  // RISKS
  {
    id: 'land-use-risks',
    label: 'Land Use Change',
    group: 'risks',
    layer: {
      enabled: true,
      visible: true,
      bands: [6, 7, 8, 9, 10],
    },
    widget: {
      enabled: true,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
    },
  },
  {
    id: 'climate-risks',
    label: 'Climate change',
    group: 'risks',
    layer: {
      enabled: true,
      visible: true,
      band: 11,
    },
    widget: {
      enabled: true,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
      sql: squel
        .select()
        .field('SUM(CASE WHEN climate_risk = 1 THEN pixel_count ELSE 0 END)', 'risk')
        .field('SUM(CASE WHEN climate_risk = 0 THEN pixel_count ELSE 0 END)', 'not_risk')
        .from('data'),
      download: squel
        .select()
        .field('SUM(CASE WHEN climate_risk = 1 THEN pixel_count * 3086.9136 ELSE 0 END)', 'risk')
        .field(
          'SUM(CASE WHEN climate_risk = 0 THEN pixel_count * 3086.9136 ELSE 0 END)',
          'not_risk'
        )
        .from('data'),
    },
  },
  {
    id: 'pollution-risk',
    label: 'Pollution',
    group: 'risks',
    layer: {
      enabled: true,
      visible: true,
      band: 12,
    },
    widget: {
      enabled: true,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
      sql: squel
        .select()
        .field('SUM(CASE WHEN pesticide_risk = 1 THEN pixel_count ELSE 0 END)', 'risk')
        .field('SUM(CASE WHEN pesticide_risk = 0 THEN pixel_count ELSE 0 END)', 'not_risk')
        .from('data'),
      download: squel
        .select()
        .field('SUM(CASE WHEN pesticide_risk = 1 THEN pixel_count * 3086.9136 ELSE 0 END)', 'risk')
        .field(
          'SUM(CASE WHEN pesticide_risk = 0 THEN pixel_count * 3086.9136 ELSE 0 END)',
          'not_risk'
        )
        .from('data'),
    },
  },
  // OPPORTUNITIES
  // {
  //   id: 'restoration',
  //   label: 'Restoration',
  //   group: 'opportunities',
  //   layer: {
  //     enabled: false,
  //     visible: true,
  //   },
  //   widget: {
  //     enabled: false,
  //     toolbar: {
  //       download: true,
  //       info: true,
  //       layer: true,
  //     },
  //   },
  // },
  // {
  //   id: 'agroforestry',
  //   label: 'Agroforestry',
  //   group: 'opportunities',
  //   layer: {
  //     enabled: false,
  //     visible: true,
  //   },
  //   widget: {
  //     enabled: false,
  //     toolbar: {
  //       download: true,
  //       info: true,
  //       layer: true,
  //     },
  //   },
  // },
  // {
  //   id: 'soil-health-management-cover-crops-area',
  //   label: 'Soil Health Management (cover crops area)',
  //   group: 'opportunities',
  //   layer: {
  //     enabled: false,
  //     visible: true,
  //   },
  //   widget: {
  //     enabled: false,
  //     toolbar: {
  //       download: true,
  //       info: true,
  //       layer: true,
  //     },
  //   },
  // },
  // LOCATIONS
  {
    id: 'locations',
    label: 'Locations',
    group: 'other',
    layer: {
      enabled: false,
      visible: false,
      band: 34,
    },
    widget: {
      enabled: false,
      toolbar: {
        download: false,
        info: false,
        layer: false,
      },
      sql: squel
        .select()
        .field('province', 'id')
        .field('country', 'parent_id')
        .distinct()
        .from('data')
        .where('country NOT IN (-9999)')
        .group('province'),
    },
  },
  {
    id: 'countries',
    label: 'Countries',
    group: 'other',
    layer: {
      enabled: true,
      visible: false,
      band: 34,
    },
    widget: {
      enabled: false,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
    },
  },
  {
    id: 'provinces',
    label: 'Provinces',
    group: 'other',
    layer: {
      enabled: true,
      visible: false,
      band: 35,
    },
    widget: {
      enabled: false,
      toolbar: {
        download: true,
        info: true,
        layer: true,
      },
    },
  },
] satisfies Dataset[] as Dataset[];
