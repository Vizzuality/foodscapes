import Controls from 'components/map/controls';
import { Media } from 'components/media-query';

import LayersControl from './layers';
import MenuControl from './menu';
import ZoomControl from './zoom';

const ControlsContainer = () => {
  return (
    <Controls className="absolute top-12 right-5 z-40 space-y-10 sm:top-6 sm:right-6">
      <Media greaterThanOrEqual="sm">
        <MenuControl />
      </Media>

      <div className="space-y-0.5">
        <ZoomControl />
        <Media greaterThanOrEqual="sm">
          <LayersControl />
        </Media>
      </div>
    </Controls>
  );
};

export default ControlsContainer;
