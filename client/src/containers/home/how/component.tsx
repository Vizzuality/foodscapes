import Wrapper from 'containers/wrapper';

import HowChart from './chart';
import HowText from './text';

const How = () => {
  return (
    <div className="relative z-20 bg-white">
      <Wrapper>
        <div className="flex flex-col space-y-3 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6 xl:col-start-2">
            <HowText />
          </div>
          <div className="relative z-0 lg:col-span-5 lg:col-start-8 lg:h-small-screen">
            <HowChart />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default How;
