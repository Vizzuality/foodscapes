import dynamic from 'next/dynamic';

import Hero from './hero';

const Data = dynamic(() => import('./data'), { ssr: false });

const Home = () => {
  return (
    <>
      <Hero />
      <Data />
    </>
  );
};

export default Home;
