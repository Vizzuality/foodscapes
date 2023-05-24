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
    },
  },
  {
    id: 'pollution-risks',
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
    },
  },
  // OPPORTUNITIES
  {
    id: 'restorations',
    label: 'Restoration',
    group: 'opportunities',
    layer: {
      enabled: true,
      visible: true,
      bands: [14, 17],
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
    id: 'agroforestries',
    label: 'Agroforestry',
    group: 'opportunities',
    layer: {
      enabled: true,
      visible: true,
      bands: [14, 17],
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
    },
  },
  {
    id: 'countries',
    label: 'Countries',
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
    },
  },
  {
    id: 'provinces',
    label: 'Provinces',
    group: 'other',
    layer: {
      enabled: false,
      visible: false,
      band: 35,
    },
    widget: {
      enabled: false,
      toolbar: {
        download: false,
        info: false,
        layer: false,
      },
    },
  },
] satisfies Dataset[] as Dataset[];
