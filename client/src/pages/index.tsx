import RecoilDevTools from 'lib/recoil/devtools';

import { RecoilRoot } from 'recoil';

import Home from 'containers/home';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'Foodscapes | Regenerative Food Systems for People and Nature';
const DESCRIPTION_TEXT =
  'Explore regenerative food systems and their impact on nature and people. Discover Foodscapes, a system that maps the diversity of food production around the world to inform food system transformation and nature-based solutions. Join The Nature Conservancy and its partners in accelerating a global food system transformation through foodscape mapping and research.';

const IMAGE_URL = 'images/meta/home.jpg';

const HomePage = () => {
  return (
    <RecoilRoot>
      <RecoilDevTools />

      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <Home />
    </RecoilRoot>
  );
};

export default HomePage;
