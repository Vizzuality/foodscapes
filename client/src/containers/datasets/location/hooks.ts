import { useMemo } from 'react';

import { LayerSettings } from 'store/explore-map';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';

import { useCountry } from 'hooks/countries';
import { useProvince } from 'hooks/provinces';

interface UseFoodscapesSourceProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings>;
}

interface UseFoodscapesLayerProps {
  settings?: Partial<LayerSettings>;
}

export function useSource({ filters }: UseFoodscapesSourceProps): AnySourceData {
  const { data: countryData } = useCountry(filters.country);
  const { data: provinceData } = useProvince(filters.province);

  const DATA = provinceData?.geojson || countryData?.geojson;

  if (!DATA) return null;

  return {
    type: 'geojson',
    data: DATA,
  };
}

export function useLayer({ settings = {} }: UseFoodscapesLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'location-layer',
      type: 'line',
      paint: {
        'line-color': '#000000',
        'line-opacity': settings.opacity ?? 1,
      },
      layout: {
        visibility: visibility ? 'visible' : 'none',
      },
    };
  }, [settings, visibility]);

  return layer;
}
