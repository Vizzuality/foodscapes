import { useCallback } from 'react';

import { layersAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Dataset } from 'types/datasets';

import Switch from 'components/ui/switch';

export interface WidgetHeaderProps {
  title: string;
  dataset: Dataset;
}

const WidgetHeader = ({ title, dataset }) => {
  const { id } = dataset;

  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);

  const handleToggleLayer = useCallback(() => {
    const lys = [...layers];

    // push or slice layer in lys array base on index
    const index = lys.findIndex((ly) => ly === id);
    if (index === -1) {
      lys.unshift(id);
    } else {
      lys.splice(index, 1);
    }

    setLayers(lys);
  }, [id, layers, setLayers]);

  return (
    <header className="flex items-center justify-between space-x-5">
      <h3 className="font-display text-2xl">{title}</h3>

      <Switch checked={layers.includes(id)} onCheckedChange={handleToggleLayer} />
    </header>
  );
};

export default WidgetHeader;
