import Controls from 'components/map/controls';

import LayersControl from './layers';
import MenuControl from './menu';
import ZoomControl from './zoom';

const ControlsContainer = () => {
  return (
    <Controls className="absolute top-6 right-6 z-40 space-y-10">
      <MenuControl />
      <div className="space-y-0.5">
        <ZoomControl />
        <LayersControl />
      </div>
    </Controls>
  );
};

export default ControlsContainer;
