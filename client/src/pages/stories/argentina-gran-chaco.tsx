import RecoilDevTools from 'lib/recoil/devtools';

import { RecoilRoot } from 'recoil';

import Home from 'containers/stories/argentina-gran-chaco';

const HomePage = () => {
  return (
    <RecoilRoot override={false}>
      <RecoilDevTools />
      <Home />
    </RecoilRoot>
  );
};

export default HomePage;
