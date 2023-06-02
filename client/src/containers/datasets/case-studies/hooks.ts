import { useMemo } from 'react';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { CaseStudy } from 'types/case-studies';

import { useCaseStudy } from 'hooks/case-studies';

interface UseFoodscapesSourceProps {
  id: CaseStudy['id'];
}

interface UseFoodscapesLayerProps {
  id: CaseStudy['id'];
}

export function useSource({ id }: UseFoodscapesSourceProps): AnySourceData {
  const { data: caseStudyData } = useCaseStudy(id);

  const DATA = caseStudyData?.geojson;

  if (!DATA) return null;

  return {
    type: 'geojson',
    data: DATA,
  };
}

export function useLayer({ id }: UseFoodscapesLayerProps): AnyLayer {
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: `case-study-${id}`,
      type: 'line',
      paint: {
        'line-color': '#000000',
        'line-width': 2,
        'line-opacity': 1,
      },
      layout: {
        visibility: 'visible',
      },
    };
  }, [id]);

  return layer;
}
