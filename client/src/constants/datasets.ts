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
        .field('SUM(pixel_count)', 'value')
        .distinct()
        .from('data')
        .where('foodscapes NOT IN (1,2,3)')
        .group('foodscapes'),
      download: squel
        .select()
        .from(
          squel
            .select()
            .field('foodscapes', 'id')
            .field('soil_groups', 'parent_id')
            .field('SUM(pixel_count)', 'value')
            .distinct()
            .from('data')
            .where('foodscapes NOT IN (1,2,3)')
            .group('foodscapes'),
          'd'
        )
        .left_join(squel.select().from('foodscapes'), 'f', 'd.id = f.value')
        .left_join(squel.select().from('soil_groups'), 'g', 'd.parent_id = g.value')
        .field('d.id')
        .field('f.label')
        .field('f.color')
        .field('d.value')
        .field('d.parent_id', 'parentId')
        .field('g.label', 'parentLabel')
        .field('g.color', 'parentColor'),
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
        .field('SUM(pixel_count)', 'value')
        .distinct()
        .from('data')
        .where('intensity_groups NOT IN (0)')
        .group('intensity_groups'),
      download: squel
        .select()
        .from(
          squel
            .select()
            .field('intensity_groups', 'id')
            .field('SUM(pixel_count)', 'value')
            .distinct()
            .from('data')
            .where('intensity_groups NOT IN (0)')
            .group('intensity_groups'),
          'd'
        )
        .left_join(squel.select().from('intensity_groups'), 'f', 'd.id = f.value')
        .field('d.id')
        .field('f.label')
        .field('f.color')
        .field('d.value'),
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
        .field('SUM(pixel_count)', 'value')
        .distinct()
        .from('data')
        .where('crops NOT IN (-9999)')
        .group('crops'),
      download: squel
        .select()
        .from(
          squel
            .select()
            .field('crops', 'id')
            .field('crop_groups', 'parent_id')
            .field('SUM(pixel_count)', 'value')
            .distinct()
            .from('data')
            .where('crops NOT IN (-9999)')
            .group('crops'),
          'd'
        )
        .left_join(squel.select().from('crops'), 'f', 'd.id = f.value')
        .left_join(squel.select().from('crop_groups'), 'g', 'd.parent_id = g.value')
        .field('d.id')
        .field('f.label')
        .field('f.color')
        .field('d.value')
        .field('d.parent_id', 'parentId')
        .field('g.label', 'parentLabel')
        .field('g.color', 'parentColor'),
    },
  },
  // RISKS
  {
    id: 'land-use-risk',
    label: 'Land Use Change',
    group: 'risks',
    layer: {
      enabled: true,
      visible: true,
      bands: [6, 7, 8, 9, 10],
    },
    widget: {
      enabled: false,
      sql: squel
        .select()
        .field(
          'SUM(CASE WHEN critically_endangered_ecosystems = 1 THEN pixel_count ELSE 0 END)',
          'critically_endangered_ecosystems'
        )
        .field(
          'SUM(CASE WHEN area_with_high_conservation_value = 1 THEN pixel_count ELSE 0 END)',
          'area_with_high_conservation_value'
        )
        .field(
          'SUM(CASE WHEN agricultural_frontier_zones = 1 THEN pixel_count ELSE 0 END)',
          'agricultural_frontier_zones'
        )
        .field('SUM(CASE WHEN soil_erosion = 1 THEN pixel_count ELSE 0 END)', 'soil_erosion')
        .field('SUM(CASE WHEN water_scarcity = 1 THEN pixel_count ELSE 0 END)', 'water_scarcity')
        .from('data'),

      download: squel
        .select()
        .field(
          'SUM(CASE WHEN critically_endangered_ecosystems = 1 THEN pixel_count ELSE 0 END)',
          'critically_endangered_ecosystems'
        )
        .field(
          'SUM(CASE WHEN area_with_high_conservation_value = 1 THEN pixel_count ELSE 0 END)',
          'area_with_high_conservation_value'
        )
        .field(
          'SUM(CASE WHEN agricultural_frontier_zones = 1 THEN pixel_count ELSE 0 END)',
          'agricultural_frontier_zones'
        )
        .field('SUM(CASE WHEN soil_erosion = 1 THEN pixel_count ELSE 0 END)', 'soil_erosion')
        .field('SUM(CASE WHEN water_scarcity = 1 THEN pixel_count ELSE 0 END)', 'water_scarcity')
        .from('data'),
    },
  },
  {
    id: 'climate-risk',
    label: 'Climate change',
    group: 'risks',
    layer: {
      enabled: true,
      visible: true,
      band: 11,
    },
    widget: {
      enabled: false,
      sql: squel
        .select()
        .field('SUM(CASE WHEN climate_risk = 1 THEN pixel_count ELSE 0 END)', 'risked')
        .field('SUM(CASE WHEN climate_risk = 0 THEN pixel_count ELSE 0 END)', 'not_risked')
        .from('data'),
      download: squel
        .select()
        .field('SUM(CASE WHEN climate_risk = 1 THEN pixel_count ELSE 0 END)', 'risked')
        .field('SUM(CASE WHEN climate_risk = 0 THEN pixel_count ELSE 0 END)', 'not_risked')
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
      enabled: false,
      sql: squel
        .select()
        .field('SUM(CASE WHEN pesticide_risk = 1 THEN pixel_count ELSE 0 END)', 'risked')
        .field('SUM(CASE WHEN pesticide_risk = 0 THEN pixel_count ELSE 0 END)', 'not_risked')
        .from('data'),
      download: squel
        .select()
        .field('SUM(CASE WHEN pesticide_risk = 1 THEN pixel_count ELSE 0 END)', 'risked')
        .field('SUM(CASE WHEN pesticide_risk = 0 THEN pixel_count ELSE 0 END)', 'not_risked')
        .from('data'),
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
      band: 35,
    },
    widget: {
      enabled: false,
    },
  },
] as Dataset[];
