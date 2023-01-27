import { RecoilRoot } from 'recoil';

import Home from 'containers/home';

const HomePage: React.FC = () => {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
};

export default HomePage;
