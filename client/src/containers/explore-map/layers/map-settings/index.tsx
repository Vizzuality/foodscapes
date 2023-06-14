import Basemaps from './basemaps';
import Boundaries from './boundaries';
import Labels from './labels';
import Roads from './roads';

const MapSettings = () => {
  return (
    <div className="space-y-3 px-6">
      <h3 className="font-display text-lg">Map style</h3>

      <div className="space-y-6">
        <Basemaps />

        <div className="grid grid-flow-col gap-4">
          <div className="col-span-6">
            <Labels />
          </div>

          <div className="col-span-6 space-y-3">
            <Boundaries />
            <Roads />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSettings;
