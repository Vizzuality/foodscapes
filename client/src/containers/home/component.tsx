// import dynamic from 'next/dynamic';

import { lastStepAtom, stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import Wrapper from 'containers/wrapper';

import FadeY from './animations/fadeY';
import CirclesChart from './circles/charts';
import {
  Text1 as CirclesText1,
  Text2 as CirclesText2,
  Text3 as CirclesText3,
  Text4 as CirclesText4,
} from './circles/texts';
import GlobeChart from './globe/chart';
import GlobeText from './globe/text';
import Hero from './hero';
import How from './how';
import LayersChart from './layers/chart';
import { Text1 as LayersText1 } from './layers/texts';
import ScrollItem from './scroll';

// const LayersChart = dynamic(() => import('./layers/charts'), {
//   ssr: false,
// });

const Home = () => {
  const step = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setLastStep = useSetRecoilState(lastStepAtom);

  const onChange = useDebouncedCallback((id: number) => {
    setLastStep(step);
    setStep(id);
  }, 100);

  return (
    <>
      <ScrollItem key={`scroll-0`} step={0} onChange={onChange}>
        <Hero key="hero" />
      </ScrollItem>

      <ScrollItem key={`scroll-1`} step={1} onChange={onChange}>
        <How />
      </ScrollItem>

      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="relative z-10 col-span-5 xl:col-span-4 xl:col-start-2">
            <ScrollItem key={`scroll-2`} step={2} onChange={onChange}>
              <LayersText1 key="text-layers-1" />
            </ScrollItem>
            <ScrollItem key={`scroll-3`} step={3} onChange={onChange}>
              <CirclesText1 key="text-circles-1" />
            </ScrollItem>
            <ScrollItem key={`scroll-4`} step={4} onChange={onChange}>
              <CirclesText2 key="text-circles-2" />
            </ScrollItem>
            <ScrollItem key={`scroll-5`} step={5} onChange={onChange}>
              <CirclesText3 key="text-circles-3" />
            </ScrollItem>
            <ScrollItem key={`scroll-6`} step={6} onChange={onChange}>
              <CirclesText4 key="text-circles-4" />
            </ScrollItem>
            <ScrollItem key={`scroll-7`} step={7} onChange={onChange}>
              <GlobeText key="text-globe-1" />
            </ScrollItem>
          </div>

          <div className="sticky top-0 z-0 col-span-5 col-start-7 h-small-screen">
            <AnimatePresence>
              {step === 2 && (
                <FadeY key="layers-chart">
                  <LayersChart />
                </FadeY>
              )}

              {(step === 3 || step === 4 || step === 5 || step === 6) && (
                <FadeY key="circles-chart">
                  <CirclesChart />
                </FadeY>
              )}

              {step === 7 && (
                <FadeY key="globe-chart" className="z-20">
                  <GlobeChart />
                </FadeY>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Wrapper>

      {/* <div className="sticky top-0 left-0 z-0 h-small-screen w-full">

      </div> */}
    </>
  );
};

export default Home;
