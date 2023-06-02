import { useCallback, useMemo } from 'react';

import { filtersSelector, layersAtom, layersSettingsAtom } from 'store/explore-map';
import { menuOpenAtom } from 'store/menu';

import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { LayerSettings, LayerType } from 'types/layers';

import { DATASETS } from 'constants/datasets';

import { INFO, LEGENDS } from 'containers/datasets';

import Legend from 'components/map/legend';

const LegendContainer = () => {
  const menuOpen = useRecoilValue(menuOpenAtom);
  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayerSettings = useSetRecoilState(layersSettingsAtom);
  const filters = useRecoilValue(filtersSelector(null));

  const handleChangeOrder = useCallback(
    (order) => {
      const newLayers = order.map((id) => {
        return layers.find((layer) => layer === id);
      });

      setLayers(newLayers);
    },
    [layers, setLayers]
  );

  const handleChangeOpacity = useDebouncedCallback(
    (id, opacity) =>
      setLayerSettings({
        ...layersSettings,
        [id]: {
          ...(layersSettings[id] || { opacity: 1, visibility: true, expand: true }),
          opacity,
        },
      }),
    250,
    { maxWait: 1000 }
  );

  const handleChangeVisibility = useCallback(
    (id, visibility) =>
      setLayerSettings({
        ...layersSettings,
        [id]: {
          ...(layersSettings[id] || { opacity: 1, visibility: true, expand: true }),
          visibility,
        },
      }),
    [layersSettings, setLayerSettings]
  );

  const handleChangeExpand = useCallback(
    (id, expand) =>
      setLayerSettings({
        ...layersSettings,
        [id]: {
          ...(layersSettings[id] || { opacity: 1, visibility: true, expand: true }),
          expand,
        },
      }),
    [layersSettings, setLayerSettings]
  );

  const handleChangeColumn = useCallback(
    (id, column) =>
      setLayerSettings({
        ...layersSettings,
        [id]: {
          ...(layersSettings[id] || { opacity: 1, visibility: true, expand: true }),
          column,
        },
      }),
    [layersSettings, setLayerSettings]
  );

  const ITEMS = useMemo(() => {
    return layers
      .filter((layer) => !!LEGENDS[layer])
      .map((layer) => {
        const LegendComponent = LEGENDS[layer];
        const InfoComponent = INFO[layer];
        const DATASET = DATASETS.find((d) => d.id === layer);

        const settings: LayerSettings<LayerType> = layersSettings[layer];

        return (
          <LegendComponent
            id={layer}
            key={layer}
            dataset={DATASET}
            settings={settings}
            filters={filters}
            Components={{
              Info: InfoComponent ? <InfoComponent {...DATASET} /> : null,
            }}
            onChangeOpacity={(opacity) => {
              handleChangeOpacity(layer, opacity);
            }}
            onChangeVisibility={(visibility) => {
              handleChangeVisibility(layer, visibility);
            }}
            onChangeExpand={(expand) => {
              handleChangeExpand(layer, expand);
            }}
            onChangeColumn={(column) => {
              handleChangeColumn(layer, column);
            }}
          />
        );
      });
  }, [
    layers,
    filters,
    handleChangeOpacity,
    handleChangeVisibility,
    handleChangeExpand,
    handleChangeColumn,
    layersSettings,
  ]);

  return (
    <AnimatePresence>
      {!menuOpen && (
        <motion.div
          key="legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-16 right-6 z-10 w-full max-w-xs"
        >
          <Legend
            className={'max-h-[calc(100vh_-_theme(space.16)_-_theme(space.6)_-_theme(space.48))]'}
            sortable={{
              enabled: true,
              handle: true,
              handleIcon: <div className="text-white">Drag</div>,
            }}
            onChangeOrder={handleChangeOrder}
          >
            {ITEMS}
          </Legend>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegendContainer;
