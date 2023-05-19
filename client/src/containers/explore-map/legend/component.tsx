import { useCallback, useMemo } from 'react';

import { filtersSelector, layersAtom, layersSettingsAtom } from 'store/explore-map';
import { menuOpenAtom } from 'store/menu';

import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

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

  const onChangeOrder = useCallback(
    (order) => {
      const newLayers = order.map((id) => {
        return layers.find((layer) => layer === id);
      });

      setLayers(newLayers);
    },
    [layers, setLayers]
  );

  const onChangeOpacity = useDebouncedCallback(
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

  const onChangeVisibility = useCallback(
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

  const onChangeExpand = useCallback(
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

  const ITEMS = useMemo(() => {
    return layers
      .filter((layer) => !!LEGENDS[layer])
      .map((layer) => {
        const LegendComponent = LEGENDS[layer];
        const InfoComponent = INFO[layer];
        const DATASET = DATASETS.find((d) => d.id === layer);

        const settings: LayerSettings<Dataset['id']> = layersSettings[layer];

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
              onChangeOpacity(layer, opacity);
            }}
            onChangeVisibility={(visibility) => {
              onChangeVisibility(layer, visibility);
            }}
            onChangeExpand={(expand) => {
              onChangeExpand(layer, expand);
            }}
          />
        );
      });
  }, [layers, filters, onChangeOpacity, onChangeVisibility, onChangeExpand, layersSettings]);

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
            onChangeOrder={onChangeOrder}
          >
            {ITEMS}
          </Legend>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegendContainer;
