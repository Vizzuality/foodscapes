import { forwardRef } from 'react';

import Image from 'next/image';

import cn from 'lib/classnames';

import CropsWidget from 'containers/datasets/crops/widget';
import FoodscapesIntensitiesWidget from 'containers/datasets/foodscapes-intensities/widget';
import FoodscapesSummaryWidget from 'containers/datasets/foodscapes-summary/widget';
import FoodscapesWidget from 'containers/datasets/foodscapes/widget';

const FoodscapesSidebar = forwardRef(() => {
  return (
    <section className="flex grow flex-col justify-between">
      <div>
        <header>
          <div className="relative z-0 px-20 pt-72">
            <h2 className="relative z-10 border-b border-navy-500/30 pb-6 text-xl font-medium">
              Foodscapes
            </h2>
            <h3 className="relative z-10 pt-6 font-display text-5xl">
              Toward Food System Transition
            </h3>
            <div
              className={cn({
                'absolute top-0 left-0 z-0 h-[calc(100%_-_theme(space.8))] w-full bg-yellow-500':
                  true,
                'after:absolute after:top-0 after:left-full after:z-0 after:h-full after:w-full after:bg-yellow-500':
                  true,
              })}
            />
          </div>
          <div className="space-y-4 px-20 pt-4 pb-10">
            <p>
              A foodscape is a specific area of food production, defined by the combination of
              biophysical characteristics and management attributes in that area.
            </p>
            <FoodscapesSummaryWidget />
          </div>
        </header>
        <div className="w-full px-20">
          <div className="border-t border-navy-500/30">
            <FoodscapesWidget />
          </div>
          <div className="border-t border-navy-500/30">
            <FoodscapesIntensitiesWidget />
          </div>
          <div className="border-t border-navy-500/30">
            <CropsWidget />
          </div>
        </div>
      </div>

      <div>
        <Image
          src="/images/sidebar/foodscapes-tab.png"
          alt="Risks tab"
          width={640}
          height={256}
          priority
        />
      </div>
    </section>
  );
});

FoodscapesSidebar.displayName = 'FoodscapesSidebar';

export default FoodscapesSidebar;
