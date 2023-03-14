import About from 'containers/about';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'TNC Foodscapes About | Towards Food System Transition';
const DESCRIPTION_TEXT =
  'Explaining what foodscapes are and how they can contribute to the transformation of the world food system.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const AboutPage: React.FC = () => {
  return (
    <div>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <About />
    </div>
  );
};

export default AboutPage;
