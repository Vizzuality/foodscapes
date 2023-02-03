// import { stepAtom } from 'store/home';

// import { useRecoilValue } from 'recoil';

// import Circles from './circles';
// import { STEPS } from './constants';
// import Globe from './globe';
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
import HowChart from './how/chart';
import HowText from './how/text';
import LayersChart from './layers/chart';
import LayersText from './layers/text';
import ScrollList from './scroll-list';

const Home = () => {
  const step = useRecoilValue(stepAtom);

  return (
    <>
      <Hero key="hero" />

      <Wrapper>
        <div className="grid grid-cols-12 gap-20">
          <div className="relative z-10 col-span-6">
            <ScrollList>
              <HowText />
              <LayersText />
              <CirclesText1 />
              <CirclesText2 />
              <CirclesText3 />
              <CirclesText4 />
              <GlobeText />
            </ScrollList>
          </div>
          <div className="sticky top-0 z-0 col-span-6 h-small-screen">
            <AnimatePresence>
              {step === 0 && (
                <FadeY key="how-chart">
                  <HowChart />
                </FadeY>
              )}
              {step === 1 && (
                <FadeY key="layers-chart">
                  <LayersChart />
                </FadeY>
              )}
              {(step === 2 || step === 3 || step === 4 || step === 5) && (
                <FadeY key="circles-chart">
                  <CirclesChart />
                </FadeY>
              )}
              {step === 6 && (
                <FadeY key="globe-chart">
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
