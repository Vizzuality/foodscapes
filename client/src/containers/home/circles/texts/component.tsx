import { stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import FadeY from 'containers/home/animations/fadeY';

const Texts = () => {
  const stepStart = 3;
  const step = useRecoilValue(stepAtom);
  const substep = Math.min(Math.max(step - stepStart, 0), Infinity);

  return (
    <AnimatePresence>
      {substep === 0 && (
        <FadeY key="text-0" className="absolute flex h-full w-full items-center">
          <div className="space-y-10 xl:pl-20">
            <h2 className="font-display text-5xl">These layers overlap to create a foodscape.</h2>
            <div className="space-y-4">
              <p className="font-light">
                A foodscape is a specific area of food production, defined by the{' '}
                <strong className="font-semibold">
                  combination of biophysical characteristics and management attributes in that area.
                </strong>
              </p>
              <p className="font-light">
                Simply put, a foodscape maps{' '}
                <strong className="font-semibold">a portion of the global food system</strong>,
                categorized by ecological and human influences.
              </p>
              <p className="font-light">
                At this time,{' '}
                <strong className="font-semibold">
                  soy is being produced in several foodscapes around the world.
                </strong>
              </p>
            </div>
          </div>
        </FadeY>
      )}
      {substep === 1 && (
        <FadeY key="text-1" className="absolute flex h-full w-full items-center">
          <div className="space-y-10 xl:pl-20">
            <h2 className="font-display text-3xl">In 2010</h2>
            <div className="space-y-4">
              <p className="font-light">
                More than <strong className="font-semibold">240 million tons of soy</strong> was
                produced across nearly all 83 different foodscapes. Of that, almost{' '}
                <strong className="font-semibold">
                  68% comes from intensive production systems
                </strong>
                , where field size is large and agricultural inputs are high.
              </p>
            </div>
          </div>
        </FadeY>
      )}

      {substep === 2 && (
        <FadeY key="text-2" className="absolute flex h-full w-full items-center">
          <div className="space-y-10 xl:pl-20">
            <h2 className="font-display text-3xl">In 2010</h2>
            <div className="space-y-4">
              <p className="font-light">
                Just one of these 83 different foodscapes produces{' '}
                <strong className="font-semibold">19% of soy globally</strong>. It is characterized
                by its deep fertile soils called Mollisols that are found in the world’s plains, its
                rainfed irrigation, and its single-cropped fields of cereal and oil. Let us focus on
                this foodscape.
              </p>
            </div>
          </div>
        </FadeY>
      )}

      {substep === 3 && (
        <FadeY key="text-3" className="absolute flex h-full w-full items-center">
          <div className="space-y-10 xl:pl-20">
            <h2 className="font-display text-4xl">A Globally Distributed Foodscape</h2>
            <div className="space-y-4">
              <p className="font-light">
                It is interesting to note that{' '}
                <strong className="font-semibold">the same foodscape</strong> favored by soy{' '}
                <strong className="font-semibold">
                  accounts for 1.4% of the global agricultural landscape, spanning 5 continents.
                </strong>{' '}
                These similarities offer a good starting point to learn from and apply to similar
                foodscapes across the globe.
              </p>
            </div>
          </div>
        </FadeY>
      )}
    </AnimatePresence>
  );
};

export default Texts;
