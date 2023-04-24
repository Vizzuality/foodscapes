import { useCallback } from 'react';

import cn from 'lib/classnames';

import { layersAtom } from 'store/explore-map';

import { Dialog } from '@radix-ui/react-dialog';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Dataset } from 'types/datasets';

import { INFO } from 'containers/datasets';

import Icon from 'components/icon';
import { Checkbox } from 'components/ui/checkbox';
import { DialogContent, DialogTrigger } from 'components/ui/dialog';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const LayerItem = (props: Dataset) => {
  const { label, id, layer } = props;
  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);

  const Info = INFO[id];

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
      <div className="flex grow space-x-3">
        <Checkbox
          id={id}
          checked={layers.includes(id)}
          disabled={!layer.enabled}
          className="pointer-events-none mt-1 h-3 w-3 rounded-sm group-hover:border-navy-400 group-hover:bg-navy-400"
          onCheckedChange={handleToggleLayer}
        />

        <label
          htmlFor={id}
          className={cn({
            'cursor-pointer text-sm font-light text-navy-500 transition-colors': true,
            'group-hover:text-navy-400': true,
          })}
        >
          {label}
        </label>
      </div>

      <Dialog>
        <DialogTrigger asChild>
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
        </DialogTrigger>

        <DialogContent>{!!Info && <Info {...props} />}</DialogContent>
      </Dialog>
    </div>
  );
};

export default LayerItem;
