import { forwardRef } from 'react';

import RisksWidget from 'containers/datasets/risks-climate-change/widget';

const RisksSidebar = forwardRef(() => {
  return (
    <section>
      <header>
        <div className="relative z-0 px-20 pt-36">
          <h2 className="relative z-10 border-b border-navy-500/30 pb-6 text-xl font-medium">
            Risks
          </h2>
          <h3 className="relative z-10 pt-6 font-display text-5xl">The State of Our Foodscapes</h3>
          <div className="absolute top-0 left-0 z-0 h-[calc(100%_-_theme(space.8))] w-full bg-red-500" />
        </div>
        <div className="space-y-4 px-20 pt-4 pb-10">
          <p>
            The world’s foodscapes have supported a steady increase in food production during
            decades of population growth and dietary evolution. Yet climate change and associated
            natural disasters—drought, fire, flooding, and pest and disease outbreaks—threaten the
            resilience of the world’s foodscapes.
          </p>
        </div>
      </header>

      <div className="w-full px-20">
        <div className="border-t border-navy-500/30">
          <RisksWidget />
        </div>

        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
      </div>
    </section>
  );
});

RisksSidebar.displayName = 'RisksSidebar';

export default RisksSidebar;
