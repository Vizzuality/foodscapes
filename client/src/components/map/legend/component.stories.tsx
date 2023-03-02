import { useCallback, useMemo, useState } from 'react';

import { Story } from '@storybook/react/types-6-0';

import Legend from './component';
import LegendItem from './item';
import ITEMS from './mock';
import { LegendProps } from './types';
import LegendTypeBasic from './types/basic';
import LegendTypeChoropleth from './types/choropleth';
import LegendTypeGradient from './types/gradient';
import LegendTypeMatrix from './types/matrix';

const DefaultStory = {
  title: 'Components/Map/Legend',
  component: Legend,
};

const Template: Story<LegendProps> = (args) => {
  const { sortable } = args;
  const [sortArray, setSortArray] = useState([]);
  // Sorted
  const sortedItems = useMemo(() => {
    return ITEMS.sort((a, b) => {
      return sortArray.indexOf(a.id) - sortArray.indexOf(b.id);
    });
  }, [sortArray]);

  // Callbacks
  const onChangeOrder = useCallback((ids) => {
    setSortArray(ids);
  }, []);

  return (
    <Legend {...args} sortable={sortable} onChangeOrder={onChangeOrder}>
      {sortedItems.map((i) => {
        const { type, items, intersections } = i;

        return (
          <LegendItem
            sortable={sortable}
            Components={{
              Info: <div>Info</div>,
            }}
            key={i.id}
            {...i}
          >
            {type === 'matrix' && (
              <LegendTypeMatrix
                className="text-sm text-white"
                intersections={intersections}
                items={items}
              />
            )}
            {type === 'basic' && (
              <LegendTypeBasic className="text-sm text-gray-300" items={items} />
            )}
            {type === 'choropleth' && (
              <LegendTypeChoropleth className="text-sm text-gray-300" items={items} />
            )}
            {type === 'gradient' && (
              <LegendTypeGradient className={{ box: 'text-sm text-gray-300' }} items={items} />
            )}
          </LegendItem>
        );
      })}
    </Legend>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: '',
};

export const Sortable = Template.bind({});
Sortable.args = {
  className: '',
  sortable: {
    enabled: true,
  },
};

export const SortableHandle = Template.bind({});
SortableHandle.args = {
  className: '',
  sortable: {
    enabled: true,
    handle: true,
  },
};

export default DefaultStory;
