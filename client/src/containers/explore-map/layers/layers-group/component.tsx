import { useMemo } from 'react';

import { LAYERS } from 'constants/layers';

import LayerItem from './item';

export interface LayersProps {
  name: string;
  group: string;
}

const Layers = ({ name, group }) => {
  const GROUP_LAYERS = useMemo(() => {
    return LAYERS.filter((b) => b.group === group);
  }, [group]);

  return (
    <div className="space-y-3 px-6">
      <h3 className="font-display text-lg">{name}</h3>

      <ul className="space-y-2">
        {GROUP_LAYERS.map((l) => (
          <li key={l.value}>
            <LayerItem {...l} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layers;
