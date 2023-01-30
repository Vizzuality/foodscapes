import { stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { STEPS } from './constants';
import Globe from './globe';
import Hero from './hero';
import How from './how';
import ScrollList from './scroll-list';

const Home = () => {
  const step = useRecoilValue(stepAtom);
  const STEP = STEPS.find((s) => s.id === step);

  return (
    <>
      <div className="sticky top-0 left-0 z-0 h-small-screen w-full">
        <AnimatePresence>
          {STEP.section === 'hero' && <Hero key="hero" />}
          {STEP.section === 'how' && <How key="how" />}
          {STEP.section === 'globe' && <Globe key="globe" />}
        </AnimatePresence>
      </div>

      <ScrollList />
    </>
  );
};

export default Home;
