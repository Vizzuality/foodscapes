import Globe from './globe';
import Hero from './hero';
import ScrollList from './scroll-list';

const Home = () => {
  return (
    <>
      <div className="sticky top-0 left-0 z-0 h-small-screen w-full">
        <Hero />
        <Globe />
      </div>

      <ScrollList />
    </>
  );
};

export default Home;
