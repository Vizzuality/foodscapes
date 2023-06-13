import { useCallback, useEffect } from 'react';

import { useMap } from 'react-map-gl';

import { mapSettingsAtom } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { AnyLayerWithMetadata } from 'types/map';

const MapSettings = ({ id }) => {
  const { [id]: mapRef } = useMap();
  const { basemap, labels, boundaries, roads } = useRecoilValue(mapSettingsAtom);

  const handleBasemap = useCallback(
    (b) => {
      if (!mapRef) return;
      const BASEMAP_GROUPS = ['basemap'];
      const map = mapRef.getMap();
      const { layers, metadata } = mapRef.getStyle();

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
      if (!mapRef) return;
      const LABELS_GROUP = ['labels'];
      const map = mapRef.getMap();
      const { layers, metadata } = mapRef.getStyle();

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

  const handleBoundaries = useCallback(
    (b: boolean) => {
      if (!mapRef) return;
      const BOUNDARIES_GROUP = ['boundaries'];
      const map = mapRef.getMap();
      const { layers, metadata } = mapRef.getStyle();

      const lys = layers as AnyLayerWithMetadata[];

      const boundariesGroups = Object.keys(metadata['mapbox:groups']).filter((k) => {
        const { name } = metadata['mapbox:groups'][k];

        const boundariesGroup = BOUNDARIES_GROUP.map((rgr) => name.toLowerCase().includes(rgr));

        return boundariesGroup.some((bool) => bool);
      });

      const boundariesLayers = lys.filter((l) => {
        const { metadata: layerMetadata } = l;
        if (!layerMetadata) return false;

        const gr = layerMetadata['mapbox:group'];
        return boundariesGroups.includes(gr);
      });

      boundariesLayers.forEach((l) => {
        map.setLayoutProperty(l.id, 'visibility', b ? 'visible' : 'none');
      });
    },
    [mapRef]
  );

  const handleRoads = useCallback(
    (b: boolean) => {
      if (!mapRef) return;
      const ROADS_GROUP = ['boundaries'];
      const map = mapRef.getMap();
      const { layers, metadata } = mapRef.getStyle();

      const lys = layers as AnyLayerWithMetadata[];

      const boundariesGroups = Object.keys(metadata['mapbox:groups']).filter((k) => {
        const { name } = metadata['mapbox:groups'][k];

        const roadsGroup = ROADS_GROUP.map((rgr) => name.toLowerCase().includes(rgr));

        return roadsGroup.some((bool) => bool);
      });

      const boundariesLayers = lys.filter((l) => {
        const { metadata: layerMetadata } = l;
        if (!layerMetadata) return false;

        const gr = layerMetadata['mapbox:group'];
        return boundariesGroups.includes(gr);
      });

      boundariesLayers.forEach((l) => {
        map.setLayoutProperty(l.id, 'visibility', b ? 'visible' : 'none');
      });
    },
    [mapRef]
  );

  const handleStyleLoad = useCallback(() => {
    handleBasemap(basemap);
    handleLabels(labels);
    handleBoundaries(boundaries);
  }, [basemap, labels, boundaries, handleBasemap, handleLabels, handleBoundaries]);

  // * handle style load
  useEffect(() => {
    if (!mapRef) return;
    mapRef.on('style.load', handleStyleLoad);

    return () => {
      mapRef.off('style.load', handleStyleLoad);
    };
  }, [mapRef, handleStyleLoad]);

  // * handle basemap, labels, boundaries, roads
  useEffect(() => {
    if (!!mapRef && mapRef.loaded()) {
      handleBasemap(basemap);
    }
  }, [mapRef, basemap, handleBasemap]);

  useEffect(() => {
    if (!!mapRef && mapRef.loaded()) {
      handleLabels(labels);
    }
  }, [mapRef, labels, handleLabels]);

  useEffect(() => {
    if (!!mapRef && mapRef.loaded()) {
      handleBoundaries(boundaries);
    }
  }, [mapRef, boundaries, handleBoundaries]);

  useEffect(() => {
    if (!!mapRef && mapRef.loaded()) {
      handleRoads(roads);
    }
  }, [mapRef, roads, handleRoads]);

  return null;
};

export default MapSettings;
