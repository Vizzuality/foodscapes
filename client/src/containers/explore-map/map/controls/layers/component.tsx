import { useCallback } from 'react';

import cn from 'lib/classnames';

import { layersOpenAtom } from 'store/explore-map';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { useSetRecoilState } from 'recoil';

import Icon from 'components/icon';
import { CONTROL_BUTTON_STYLES } from 'components/map/controls/constants';
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import LAYERS_SVG from 'svgs/map/layers.svg?sprite';

const LayersControlsContainer = () => {
  const setLayersOpen = useSetRecoilState(layersOpenAtom);

  const onToogleLayers = useCallback(() => {
    setLayersOpen(true);
  }, [setLayersOpen]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn({
            [CONTROL_BUTTON_STYLES.default]: true,
            [CONTROL_BUTTON_STYLES.hover]: true,
            [CONTROL_BUTTON_STYLES.active]: true,
            [CONTROL_BUTTON_STYLES.disabled]: false,
          })}
          aria-label="Toogle layers"
          type="button"
          disabled={false}
          onClick={onToogleLayers}
        >
          <Icon icon={LAYERS_SVG} className="h-full w-full" />
        </button>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          side="left"
          align="center"
          className="rounded-none border-navy-500 bg-navy-500"
        >
          <div className="text-xxs text-white">Layers</div>

          <TooltipArrow className="fill-navy-500" width={10} height={5} />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
};

export default LayersControlsContainer;
