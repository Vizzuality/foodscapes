import RecoilDevTools from 'lib/recoil/devtools';

import { RecoilRoot } from 'recoil';

import MetaTags from 'containers/meta-tags/component';
import Home from 'containers/stories/argentina-gran-chaco';

const TITLE_TEXT = 'Foodscapes Case Studies | Regenerative Food Systems for People and Nature';
const DESCRIPTION_TEXT =
  'Explore our case studies and learn how regenerative food systems are making a difference in promoting nature and people. See how The Nature Conservancy and its partners are implementing regenerative practices in different regions. See nature-based solutions in action!';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/about.jpg`;

const HomePage = () => {
  return (
    <RecoilRoot override={false}>
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
