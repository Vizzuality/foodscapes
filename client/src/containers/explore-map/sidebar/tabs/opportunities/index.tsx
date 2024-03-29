import { forwardRef } from 'react';

import Image from 'next/image';

import cn from 'lib/classnames';

import AgroforestriesWidget from 'containers/datasets/agroforestries/widget';
import RestorationsWidget from 'containers/datasets/restorations/widget';
import SoilHealthsWidget from 'containers/datasets/soil-healths/widget';

const OpportunitiesSidebar = forwardRef(() => {
  return (
    <section className="flex grow flex-col justify-between">
      <div>
        <header>
          <div className="relative z-0 px-20 pt-72">
            <h2 className="relative z-10 border-b border-navy-500/30 pb-6 text-xl font-medium">
              Opportunities
            </h2>
            <h3 className="relative z-10 pt-6 font-display text-5xl">Foodscapes Opportunities</h3>
            <div
              className={cn({
                'absolute top-0 left-0 z-0 h-[calc(100%_-_theme(space.8))] w-full bg-green-500':
                  true,
                'after:absolute after:top-0 after:left-full after:z-0 after:h-full after:w-full after:bg-green-500':
                  true,
              })}
            />
          </div>
          <div className="space-y-4 px-20 pt-4 pb-10">
            <p>
              Nature-based solutions have considerable potential to simultaneously mitigate the
              inter-related climate, biodiversity and water challenges facing the world’s foodscapes
              while at the same time supporting improved livelihoods and well-being for food
              producers.
            </p>
          </div>
        </header>

        <div className="w-full px-20">
          <div className="border-t border-navy-500/30">
            <RestorationsWidget />
          </div>
          <div className="border-t border-navy-500/30">
            <AgroforestriesWidget />
          </div>
          <div className="border-t border-navy-500/30">
            <SoilHealthsWidget />
          </div>
        </div>
      </div>

      <div>
        <Image
          src="/images/sidebar/opportunities-tab.png"
          alt="Risks tab"
          width={640}
          height={256}
          priority
        />
      </div>
    </section>
  );
});

OpportunitiesSidebar.displayName = 'OpportunitiesSidebar';

export default OpportunitiesSidebar;
