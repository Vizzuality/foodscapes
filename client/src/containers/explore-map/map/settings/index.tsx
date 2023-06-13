import { useCallback, useEffect } from 'react';

import { useMap } from 'react-map-gl';

import { mapSettingsAtom } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { AnyLayerWithMetadata } from 'types/map';

const MapSettings = () => {
  const { default: mapRef } = useMap();
  const { basemap, labels } = useRecoilValue(mapSettingsAtom);

  const handleBasemap = useCallback(
    (b) => {
      const BASEMAP_GROUPS = ['basemap'];
      const map = mapRef.getMap();
      const { layers, metadata } = map.getStyle();

      const lys = layers as AnyLayerWithMetadata[];

      const basemapGroups = Object.keys(metadata['mapbox:groups']).filter((k) => {
        const { name } = metadata['mapbox:groups'][k];

        const matchedGroups = BASEMAP_GROUPS.map((rgr) => name.toLowerCase().includes(rgr));

        return matchedGroups.some((bool) => bool);
      });

      const basemapsWithMeta = basemapGroups.map((groupId) => ({
        ...metadata['mapbox:groups'][groupId],
        id: groupId,
      }));
      const basemapToDisplay = basemapsWithMeta.find((_basemap) => _basemap.name.includes(b));

      const basemapLayers = lys.filter((l) => {
        const { metadata: layerMetadata } = l;
        if (!layerMetadata) return false;

        const gr = layerMetadata['mapbox:group'];
        return basemapGroups.includes(gr);
      });

      basemapLayers.forEach((_layer) => {
        const match = _layer.metadata['mapbox:group'] === basemapToDisplay.id;
        if (!match) {
          map.setLayoutProperty(_layer.id, 'visibility', 'none');
        } else {
          map.setLayoutProperty(_layer.id, 'visibility', 'visible');
        }
      });
    },
    [mapRef]
  );

  const handleLabels = useCallback(
    (lbs) => {
      const LABELS_GROUP = ['labels'];
      const map = mapRef.getMap();
      const { layers, metadata } = map.getStyle();

      const lys = layers as AnyLayerWithMetadata[];

      const labelGroups = Object.keys(metadata['mapbox:groups']).filter((k) => {
        const { name } = metadata['mapbox:groups'][k];

        const matchedGroups = LABELS_GROUP.filter((rgr) => name.toLowerCase().includes(rgr));

        return matchedGroups.some((bool) => bool);
      });

      const labelsWithMeta = labelGroups.map((_groupId) => ({
        ...metadata['mapbox:groups'][_groupId],
        id: _groupId,
      }));
      const labelsToDisplay = labelsWithMeta.find((_basemap) => _basemap.name.includes(lbs)) || {};

      const labelLayers = lys.filter((l) => {
        const { metadata: layerMetadata } = l;
        if (!layerMetadata) return false;

        const gr = layerMetadata['mapbox:group'];
        return labelGroups.includes(gr);
      });

      labelLayers.forEach((_layer) => {
        const match = _layer.metadata['mapbox:group'] === labelsToDisplay.id;
        map.setLayoutProperty(_layer.id, 'visibility', match ? 'visible' : 'none');
      });
    },
    [mapRef]
  );

  useEffect(() => {
    handleBasemap(basemap);
  }, [basemap, handleBasemap]);

  useEffect(() => {
    handleLabels(labels);
  }, [labels, handleLabels]);

  // useEffect(() => {
  //   handleBoundaries(boundaries);
  // }, [boundaries, handleBoundaries]);

  return null;
};

export default MapSettings;
