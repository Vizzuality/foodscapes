// import GetInvolved from 'containers/about';

import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'Get Involved | Towards Food System Transition';
const DESCRIPTION_TEXT =
  'Explaining what foodscapes are and how they can contribute to the transformation of the world food system.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const GetInvolvedPage: React.FC = () => {
  return (
    <div className="flex h-small-screen items-center justify-center">
      +
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
