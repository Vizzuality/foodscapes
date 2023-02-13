import { BASEMAPS } from 'constants/basemaps';

import BasemapItem from './item';

const Basemaps = () => {
  return (
    <div className="space-y-2 px-6">
      <h3 className="font-display text-lg">Map style</h3>

      <ul className="space-y-2">
        {BASEMAPS.map((b) => (
          <li key={b.value}>
            <BasemapItem {...b} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Basemaps;
