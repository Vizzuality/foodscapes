// import GetInvolved from 'containers/about';

import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'Get Involved | Regenerative Food Systems for People and Nature';
const DESCRIPTION_TEXT =
  'The Nature Conservancy (TNC), International Institute for Applied Systems Analysis (IIASA), and SYSTEMIQ collaborate on Foodscapes, a project dedicated to promoting regenerative food systems and their impact on nature and people. Learn more about our research, vision, and how we aim to transform the food system through nature-based solutions.';
const IMAGE_URL = 'images/meta/about.jpg';

const GetInvolvedPage: React.FC = () => {
  return (
    <div className="flex h-small-screen items-center justify-center">
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />
      <h1 className="text-6xl">Get Involved</h1>
    </div>
  );
};

export default GetInvolvedPage;
