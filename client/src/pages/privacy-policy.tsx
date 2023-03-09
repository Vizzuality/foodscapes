import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'TNC Foodscapes Privacy Policy | Towards Food System Transition';
const DESCRIPTION_TEXT =
  'Explaining what foodscapes are and how they can contribute to the transformation of the world food system.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const Home: React.FC = () => (
  <div>
    <MetaTags
      title={TITLE_TEXT}
      description={DESCRIPTION_TEXT}
      type="website"
      imageURL={IMAGE_URL}
    />
    <h1>Privacy policy</h1>
  </div>
);

export default Home;
