import { STEPS } from './constants';
import Globe from './globe';
import Hero from './hero';
import ScrollSection from './scroll-section';

const Home = () => {
  return (
    <>
      <div className="sticky top-0 left-0 z-0 h-small-screen w-full">
        <Hero />
        <Globe />
      </div>

      <div className="-mt-[100svh]">
        {STEPS.map((step) => {
          const { id } = step;

          return <ScrollSection key={id} step={id} />;
        })}
      </div>
    </>
  );
};

export default Home;
