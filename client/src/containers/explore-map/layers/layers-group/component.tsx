import { useMemo } from 'react';

import { DATASETS } from 'constants/datasets';

import LayerItem from './item';

export interface LayersProps {
  name: string;
  group: string;
}

const Layers = ({ name, group }) => {
  const FILTERED_DATASETS = useMemo(() => {
    return (
      DATASETS
        //
        .filter((d) => d.group === group)
    );
  }, [group]);
  console.log({ FILTERED_DATASETS });
  return (
    <div className="space-y-3 pl-6 pr-7">
      <h3 className="font-display text-lg">{name}</h3>

      <ul className="space-y-2">
        {FILTERED_DATASETS.map((l) => (
          <li key={l.id}>
            <LayerItem {...l} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layers;
