import Basemaps from './basemaps';
import Boundaries from './boundaries';
import Labels from './labels';

const MapSettings = () => {
  return (
    <div className="space-y-3 px-6">
      <h3 className="font-display text-lg">Map style</h3>

      <div className="space-y-6">
        <Basemaps />

        <div className="flex justify-between">
          <Labels />

          <div className="space-y-1">
            <Boundaries />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSettings;
