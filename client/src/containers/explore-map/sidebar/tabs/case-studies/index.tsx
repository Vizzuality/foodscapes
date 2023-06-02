import { forwardRef } from 'react';

import { motion } from 'framer-motion';

import { CaseStudiesList } from 'containers/case-studies';

const CaseStudiesSidebar = forwardRef(() => {
  return (
    <motion.section
    // initial="initial"
    // animate="animate"
    // exit="exit"
    // variants={{
    //   initial: { opacity: 0 },
    //   animate: { opacity: 1 },
    //   exit: { opacity: 0 },
    // }}
    >
      <header>
        <div className="relative z-0 px-20 pt-72">
          <h2 className="relative z-10 border-b border-navy-500/30 pb-6 text-xl font-medium">
            Case Studies
          </h2>
          <h3 className="relative z-10 pt-6 font-display text-5xl">Foodscapes in Focus</h3>
          <div className="absolute top-0 left-0 z-0 h-[calc(100%_-_theme(space.8))] w-full bg-violet-500" />
        </div>
        <div className="space-y-4 px-20 pt-4 pb-10">
          <p>
            This section presents a series of terrestrial and aquatic foodscapes across all
            continents. These brief case studies illustrate the diversity of relevant nature-based
            solutions that might apply, the multiple means for scaling adoption, and the different
            sources of value such solutions can unlock for producers and the public.
          </p>
        </div>
      </header>
      <div className="w-full px-20">
        <div className="border-t border-navy-500/30">
          <CaseStudiesList />
        </div>
      </div>
    </motion.section>
  );
});

CaseStudiesSidebar.displayName = 'CaseStudiesSidebar';

export default CaseStudiesSidebar;
