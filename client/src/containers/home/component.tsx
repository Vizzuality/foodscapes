import { useMemo } from 'react';

import Image from 'next/image';

import cn from 'lib/classnames';

import { lastStepAtom, stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import FadeY from 'containers/animations/fadeY';
import Wrapper from 'containers/wrapper';

import { Media } from 'components/media-query';

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

  const ANIMATE_GLOBE = useMemo(() => {
    if (step >= 10) {
      return 'animate';
    }

    return 'exit';
  }, [step]);

  const onChange = useDebouncedCallback((id: number) => {
    setLastStep(step);
    setStep(id);
  }, 100);

  return (
    <div
      className={cn({
        'w-full overflow-hidden lg:overflow-visible': true,
        'bg-white transition-colors lg:bg-white': true,
        'bg-green-500': step === 3,
        'bg-red-500': step === 4,
        'bg-yellow-500': step === 5,
      })}
    >
      <ScrollItem step={0} onChange={onChange}>
        <Hero />
      </ScrollItem>

      <ScrollItem step={1} onChange={onChange}>
        <How />
      </ScrollItem>

      <Media lessThan="sm" className="px-10">
        <ScrollItem step={2} onChange={onChange}>
          <LayersText1 />
          <LayersChart initialStep={2} currentStep={2} />
        </ScrollItem>
        <ScrollItem step={3} onChange={onChange}>
          <LayersText2 />
          <LayersChart initialStep={2} currentStep={3} />
        </ScrollItem>
        <ScrollItem step={4} onChange={onChange}>
          <LayersText3 />
          <LayersChart initialStep={2} currentStep={4} />
        </ScrollItem>
        <ScrollItem step={5} onChange={onChange}>
          <LayersText4 />
          <LayersChart initialStep={2} currentStep={5} />
        </ScrollItem>
        <ScrollItem step={6} onChange={onChange}>
          <CirclesText1 />
          <LayersChart initialStep={2} currentStep={6} />
        </ScrollItem>
        <ScrollItem step={7} onChange={onChange}>
          <CirclesText2 />
          <CirclesChart initialStep={6} currentStep={7} />
        </ScrollItem>
        <ScrollItem step={8} onChange={onChange}>
          <CirclesText3 />
          <CirclesChart initialStep={6} currentStep={8} />
        </ScrollItem>
        <ScrollItem step={9} onChange={onChange}>
          <CirclesText4 />
          <CirclesChart initialStep={6} currentStep={9} />
        </ScrollItem>
        <ScrollItem step={10} onChange={onChange}>
          <div className="flex flex-col">
            <GlobeText />
            <div className="-mx-10">
              <Image
                width={414}
                height={317}
                src="/images/globe/globe-mobile.jpg"
                alt="Globe with Foodscapes image"
                className="object-fill"
              />
            </div>
          </div>
        </ScrollItem>
      </Media>

      <Media greaterThanOrEqual="sm">
        <Wrapper>
          <div className="grid grid-cols-12 gap-6">
            <div className="relative z-10 col-span-5 xl:col-span-4 xl:col-start-2">
              <ScrollItem step={2} onChange={onChange}>
                <LayersText1 />
              </ScrollItem>
              <ScrollItem step={3} onChange={onChange}>
                <LayersText2 />
              </ScrollItem>
              <ScrollItem step={4} onChange={onChange}>
                <LayersText3 />
              </ScrollItem>
              <ScrollItem step={5} onChange={onChange}>
                <LayersText4 />
              </ScrollItem>
              <ScrollItem step={6} onChange={onChange}>
                <CirclesText1 />
              </ScrollItem>
              <ScrollItem step={7} onChange={onChange}>
                <CirclesText2 />
              </ScrollItem>
              <ScrollItem step={8} onChange={onChange}>
                <CirclesText3 />
              </ScrollItem>
              <ScrollItem step={9} onChange={onChange}>
                <CirclesText4 />
              </ScrollItem>
              <ScrollItem step={10} onChange={onChange}>
                <GlobeText />
              </ScrollItem>
            </div>

            <div className="sticky top-0 z-0 h-96 lg:col-span-5 lg:col-start-7 lg:h-small-screen">
              <AnimatePresence>
                {[2, 3, 4, 5, 6, 7, 8, 9].includes(step) && (
                  <FadeY key="layers-chart">
                    <div className="flex h-full flex-col items-center justify-center">
                      <LayersChart initialStep={2} />
                      <CirclesChart initialStep={6} />
                    </div>
                  </FadeY>
                )}

                <FadeY animate={ANIMATE_GLOBE}>
                  <GlobeMap currentId="desktop-globe" />
                </FadeY>
              </AnimatePresence>
            </div>
          </div>
        </Wrapper>
      </Media>

      <ScrollItem step={11} onChange={onChange}>
        <Outro />
      </ScrollItem>

      {/* <div className="sticky top-0 left-0 z-0 h-small-screen w-full">

      </div> */}
    </div>
  );
};

export default Home;
