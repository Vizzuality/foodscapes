import dynamic from 'next/dynamic';

import { stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

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
import {
  Text1 as LayersText1,
  Text2 as LayersText2,
  Text3 as LayersText3,
  Text4 as LayersText4,
} from './layers/texts';
import ScrollList from './scroll-list';

const LayersChart = dynamic(() => import('./layers/charts'), {
  ssr: false,
});

const Home = () => {
  const step = useRecoilValue(stepAtom);

  return (
    <>
      <Hero key="hero" />

      <How />

      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="relative z-10 col-span-5 xl:col-span-4 xl:col-start-2">
            <ScrollList>
              <LayersText1 key="text-layers-1" />
              <LayersText2 key="text-layers-2" />
              <LayersText3 key="text-layers-3" />
              <LayersText4 key="text-layers-4" />
              <CirclesText1 key="text-circles-1" />
              <CirclesText2 key="text-circles-2" />
              <CirclesText3 key="text-circles-3" />
              <CirclesText4 key="text-circles-4" />
              <GlobeText key="text-globe-1" />
            </ScrollList>
          </div>
          <div className="sticky top-0 z-0 col-span-5 col-start-7 h-small-screen">
            <AnimatePresence>
              {/* {(step === 0 || step === 1 || step === 2 || step === 3 || step === 4) && ( */}
              <FadeY key="layers-chart">
                <LayersChart />
              </FadeY>

              {(step === 5 || step === 6 || step === 7) && (
                <FadeY key="circles-chart">
                  <CirclesChart />
                </FadeY>
              )}
              {step === 8 && (
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
