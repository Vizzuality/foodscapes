import cn from 'lib/classnames';
import { ScrollProvider } from 'lib/scroll';

import { lastStepAtom, stepAtom } from 'store/stories/gran-chaco';

import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { Media } from 'components/media-query';

// Mobile
import BackgroundMobile from './background-mobile';
import IntroHeroMobile from './intro-mobile/hero';
import IntroHowMobile from './intro-mobile/how';
import IntroRiskMobile from './intro-mobile/risk';
import IntroBackground from './intro/background';
import IntroHero from './intro/hero';
import IntroHow from './intro/how';
import IntroMask from './intro/mask';
import IntroRisk from './intro/risk';
import NatureBasedChart1Mobile from './nature-based-solutions-mobile/chart-1';
import NatureBasedChart2Mobile from './nature-based-solutions-mobile/chart-2';
import NatureBasedChart3Mobile from './nature-based-solutions-mobile/chart-3';
import NatureBasedChart4Mobile from './nature-based-solutions-mobile/chart-4';
import NatureBasedHeroMobile from './nature-based-solutions-mobile/hero';
// Desktop
import NatureBasedBackground1 from './nature-based-solutions/background-1';
import NatureBasedBackground2 from './nature-based-solutions/background-2';
import NatureBasedBackground3 from './nature-based-solutions/background-3';
import NatureBasedChart1 from './nature-based-solutions/chart-1';
import NatureBasedChart2 from './nature-based-solutions/chart-2';
import NatureBasedChart3 from './nature-based-solutions/chart-3';
import NatureBasedChart4 from './nature-based-solutions/chart-4';
import NatureBasedHero from './nature-based-solutions/hero';
import NatureBasedMask from './nature-based-solutions/mask';
import Outro from './outro';
import ScrollItem from './scroll';

const GranChaco = () => {
  const step = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setLastStep = useSetRecoilState(lastStepAtom);

  const onChange = useDebouncedCallback((id: number) => {
    setLastStep(step);
    setStep(id);
  }, 100);

  return (
    <>
      <Media lessThan="sm">
        <div
          className={cn({
            'w-full overflow-hidden': true,
          })}
        >
          <ScrollItem step={0} onChange={onChange}>
            <IntroHeroMobile />
          </ScrollItem>

          <ScrollItem step={1} onChange={onChange}>
            <IntroHowMobile />
          </ScrollItem>

          <ScrollItem step={2} onChange={onChange}>
            <IntroRiskMobile />
          </ScrollItem>

          <ScrollItem step={3} onChange={onChange}>
            <NatureBasedHeroMobile />
          </ScrollItem>

          <ScrollItem step={4} onChange={onChange}>
            <NatureBasedChart1Mobile />
          </ScrollItem>

          <ScrollItem step={5} onChange={onChange}>
            <NatureBasedChart2Mobile />
          </ScrollItem>

          <ScrollItem step={6} onChange={onChange}>
            <NatureBasedChart3Mobile />
          </ScrollItem>

          <ScrollItem step={7} onChange={onChange}>
            <NatureBasedChart4Mobile />
          </ScrollItem>

          <ScrollItem step={8} onChange={onChange}>
            <Outro />
          </ScrollItem>

          <div className="fixed top-0 left-0 z-0 h-full w-full">
            <BackgroundMobile
              id="intro-background"
              key="intro-background"
              src="/images/stories/argentina-gran-chaco/granchaco-1.jpg"
              alt="Gran Chaco"
              width={2000}
              height={1100}
              visible={[0, 1, 2, 3, 4, 5, 6, 7, 8].includes(step)}
              Atributtion={
                <>
                  <p className="text-xxs text-white">Gran Chaco. Argentina.</p>
                  <p className="text-xxs text-white">© AlejandraPinzón</p>
                </>
              }
            />

            <BackgroundMobile
              id="nature-based-background-img-1"
              key="nature-based-background-img-1"
              src="/images/stories/argentina-gran-chaco/granchaco-2.jpg"
              alt="Gran Chaco"
              width={2400}
              height={1600}
              visible={[3, 4, 5, 6, 7, 8].includes(step)}
              Atributtion={
                <>
                  <p className="text-xxs text-white">Gran Chaco. Argentina.</p>
                  <p className="text-xxs text-white">© AlejandraPinzón</p>
                </>
              }
            />

            <BackgroundMobile
              id="nature-based-background-img-2"
              key="nature-based-background-img-2"
              src="/images/stories/argentina-gran-chaco/granchaco-3.jpg"
              alt="Gran Chaco - corn"
              width={2400}
              height={1600}
              visible={[6, 7, 8].includes(step)}
              Atributtion={
                <>
                  <p className="text-xxs text-white">Gran Chaco. Argentina.</p>
                  <p className="text-xxs text-white">© AlejandraPinzón</p>
                </>
              }
            />

            <BackgroundMobile
              id="nature-based-background-img-3"
              key="nature-based-background-img-3"
              src="/images/stories/argentina-gran-chaco/granchaco-4.jpg"
              alt="Gran Chaco - outro"
              width={2400}
              height={1600}
              visible={[8].includes(step)}
              Atributtion={
                <>
                  <p className="text-xxs text-white">India.</p>
                  <p className="text-xxs text-white">© Smita Sharma</p>
                </>
              }
            />
          </div>
        </div>
      </Media>

      <Media greaterThanOrEqual="sm">
        <ScrollProvider>
          <ScrollItem step={0} onChange={onChange}>
            <IntroHero />
          </ScrollItem>

          <ScrollItem step={1} onChange={onChange}>
            <IntroHow />
          </ScrollItem>

          <ScrollItem step={2} onChange={onChange}>
            <IntroRisk />
          </ScrollItem>

          <ScrollItem step={3} onChange={onChange}>
            <NatureBasedHero />
          </ScrollItem>

          <ScrollItem step={4} onChange={onChange}>
            <NatureBasedChart1 />
          </ScrollItem>

          <ScrollItem step={5} onChange={onChange}>
            <NatureBasedChart2 />
          </ScrollItem>

          <ScrollItem step={6} onChange={onChange}>
            <NatureBasedChart3 />
          </ScrollItem>

          <ScrollItem step={7} onChange={onChange}>
            <NatureBasedChart4 />
          </ScrollItem>

          <ScrollItem step={8} onChange={onChange}>
            <Outro />
          </ScrollItem>

          {/* Backgrounds and masks */}
          <motion.div initial={false} animate={{ opacity: [0, 1, 2].includes(step) ? 1 : 0 }}>
            <IntroBackground />

            <IntroMask />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: [3, 4, 5, 6, 7, 8].includes(step) ? 1 : 0 }}
          >
            <NatureBasedBackground1 />
            <NatureBasedBackground2 />
            <NatureBasedBackground3 />

            <NatureBasedMask />
          </motion.div>
        </ScrollProvider>
      </Media>
    </>
  );
};

export default GranChaco;
