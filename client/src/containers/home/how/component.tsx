import Wrapper from 'containers/wrapper';

import HowChart from './chart';
import HowText from './text';

const Home = () => {
  return (
    <div className="relative z-20 bg-white">
      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5 xl:col-span-4 xl:col-start-2">
            <HowText />
          </div>
          <div className="relative z-0 col-span-5 col-start-7 h-small-screen">
            <HowChart />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
