import Wrapper from 'containers/wrapper';

import HowChart from './chart';
import HowText from './text';

const How = () => {
  return (
    <div className="relative z-20 bg-white">
      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 xl:col-start-2">
            <HowText />
          </div>
          <div className="relative z-0 col-span-5 col-start-8 h-small-screen">
            <HowChart />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default How;
