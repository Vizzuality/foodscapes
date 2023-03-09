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
import GlobeMap from './globe/map';
import GlobeText from './globe/text';
import Hero from './hero';
import How from './how';
import LayersChart from './layers/chart';
import {
  Text1 as LayersText1,
  Text2 as LayersText2,
  Text3 as LayersText3,
  Text4 as LayersText4,
} from './layers/texts';
import Outro from './outro';
import ScrollItem from './scroll';

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
      <ScrollItem id={`scroll-0`} step={0} onChange={onChange}>
        <Hero />
      </ScrollItem>

      <ScrollItem id={`scroll-1`} step={1} onChange={onChange}>
        <How />
      </ScrollItem>

      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="relative z-10 col-span-5 xl:col-span-4 xl:col-start-2">
            <ScrollItem id={`scroll-2`} step={2} onChange={onChange}>
              <LayersText1 />
            </ScrollItem>
            <ScrollItem id={`scroll-3`} step={3} onChange={onChange}>
              <LayersText2 />
            </ScrollItem>
            <ScrollItem id={`scroll-4`} step={4} onChange={onChange}>
              <LayersText3 />
            </ScrollItem>
            <ScrollItem id={`scroll-5`} step={5} onChange={onChange}>
              <LayersText4 />
            </ScrollItem>
            <ScrollItem id={`scroll-6`} step={6} onChange={onChange}>
              <CirclesText1 />
            </ScrollItem>
            <ScrollItem id={`scroll-7`} step={7} onChange={onChange}>
              <CirclesText2 />
            </ScrollItem>
            <ScrollItem id={`scroll-8`} step={8} onChange={onChange}>
              <CirclesText3 />
            </ScrollItem>
            <ScrollItem id={`scroll-9`} step={9} onChange={onChange}>
              <CirclesText4 />
            </ScrollItem>
            <ScrollItem id={`scroll-10`} step={10} onChange={onChange}>
              <GlobeText />
            </ScrollItem>
          </div>

          <div className="sticky top-0 z-0 col-span-5 col-start-7 h-small-screen">
            <AnimatePresence>
              {[2, 3, 4, 5, 6, 7, 8, 9].includes(step) && (
                <FadeY key="layers-chart">
                  <div className="flex h-full flex-col items-center justify-center">
                    <LayersChart initialStep={2} />
                    <CirclesChart initialStep={6} />
                  </div>
                </FadeY>
              )}

              <GlobeMap />
            </AnimatePresence>
          </div>
        </div>
      </Wrapper>

      <ScrollItem id={`scroll-11`} step={11} onChange={onChange}>
        <Outro />
      </ScrollItem>

      {/* <div className="sticky top-0 left-0 z-0 h-small-screen w-full">

      </div> */}
    </>
  );
};

export default Home;
