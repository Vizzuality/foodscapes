import { forwardRef } from 'react';

import Image from 'next/image';

import LocationRankingWidget from 'containers/datasets/location/widget';

const LocationsSidebar = forwardRef(() => {
  return (
    <section>
      <header>
        <div className="relative z-0 px-20 pt-36">
          <h2 className="relative z-10 border-b border-navy-500/30 pb-6 text-xl font-medium">
            Locations
          </h2>
          <h3 className="relative z-10 pt-6 font-display text-5xl">Foodscapes in Place</h3>
          <div className="absolute top-0 left-0 z-0 h-[calc(100%_-_theme(space.8))] w-full bg-blue-500" />
        </div>
        <div className="space-y-4 px-20 pt-4 pb-10">
          <p>
            To accelarate a global food system transformation we can take inspiration from the
            nature-based solutions that would work in one spefic area and extrapolate these to
            similar foodscapes worldwide.
          </p>
          {/* <p>
            This section gives the opportunity to discover the state of foodscapes around the globe.
          </p> */}
        </div>
      </header>

      <div className="w-full px-20">
        {/* <div className="border-t border-navy-500/30"> */}
        <LocationRankingWidget />
        {/* </div> */}
      </div>

      <div>
        <Image src="/images/sidebar/locations-tab.png" alt="Risks tab" width={640} height={256} />
      </div>
    </section>
  );
});

LocationsSidebar.displayName = 'LocationsSidebar';

export default LocationsSidebar;
