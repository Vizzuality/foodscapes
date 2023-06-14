import { BASEMAPS } from 'constants/basemaps';

import BasemapItem from './item';

const Basemaps = () => {
  return (
    <ul className="flex space-x-8">
      {BASEMAPS.map((b) => (
        <li key={b.value}>
          <BasemapItem {...b} />
        </li>
      ))}
    </ul>
  );
};

export default Basemaps;
