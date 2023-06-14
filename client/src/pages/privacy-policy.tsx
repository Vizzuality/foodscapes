import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'Privacy Policy | Regenerative Food Systems for People and Nature';
const DESCRIPTION_TEXT =
  'The Nature Conservancy (TNC), International Institute for Applied Systems Analysis (IIASA), and SYSTEMIQ collaborate on Foodscapes, a project dedicated to promoting regenerative food systems and their impact on nature and people. Learn more about our research, vision, and how we aim to transform the food system through nature-based solutions.';
const IMAGE_URL = `images/meta/about.jpg`;

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
