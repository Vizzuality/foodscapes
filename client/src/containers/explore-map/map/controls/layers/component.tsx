import { useCallback } from 'react';

import cn from 'lib/classnames';

import { layersOpenAtom } from 'store/explore-map';

import { useSetRecoilState } from 'recoil';

import Icon from 'components/icon';
import { CONTROL_BUTTON_STYLES } from 'components/map/controls/constants';

import LAYERS_SVG from 'svgs/map/layers.svg?sprite';

const LayersControlsContainer = () => {
  const setLayersOpen = useSetRecoilState(layersOpenAtom);

  const onToogleLayers = useCallback(() => {
    setLayersOpen(true);
  }, [setLayersOpen]);

  return (
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
  );
};

export default LayersControlsContainer;
