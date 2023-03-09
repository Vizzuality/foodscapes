import { RecoilRoot } from 'recoil';

import Home from 'containers/home';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'TNC Foodscapes | Towards Food System Transition ';
const DESCRIPTION_TEXT =
  'Explaining what foodscapes are and how they can contribute to the transformation of the world food system.';

const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const HomePage: React.FC = () => {
  return (
    <RecoilRoot override={false}>
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
