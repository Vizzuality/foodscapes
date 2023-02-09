import { RecoilRoot } from 'recoil';

import Home from 'containers/home';

const HomePage = () => {
  return (
    <RecoilRoot override={false}>
      <Home />
    </RecoilRoot>
  );
};

export default HomePage;
