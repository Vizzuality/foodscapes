import { useCallback } from 'react';

import cn from 'lib/classnames';

import { layersAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Dataset } from 'types/datasets';

import Checkbox from 'components/forms/checkbox';
import Icon from 'components/icon';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const LayerItem = ({ label, id, layer }: Dataset) => {
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
    <div
      className={cn({
        'group flex items-center justify-between space-x-8': true,
        'pointer-events-none opacity-25': !layer.enabled,
      })}
    >
      <button
        className="flex grow space-x-3"
        type="button"
        disabled={!layer.enabled}
        onClick={handleToggleLayer}
      >
        <Checkbox
          checked={layers.includes(id)}
          readOnly
          className="pointer-events-none mt-1 h-3 w-3 rounded-sm group-hover:border-navy-400 group-hover:bg-navy-400"
        />

        <span
          className={cn({
            'text-sm font-light text-navy-500 transition-colors': true,
            'group-hover:text-navy-400': true,
          })}
        >
          {label}
        </span>
      </button>

      <button type="button" className="h-4 w-4 shrink-0" disabled={!layer.enabled}>
        <Icon
          icon={INFO_SVG}
          className={cn({
            'h-full w-full text-navy-500 ': true,
            'rounded-full hover:text-navy-400 active:text-navy-500 active:outline active:outline-1 active:outline-navy-400':
              true,
          })}
        />
      </button>
    </div>
  );
};

export default LayerItem;
