import { useCallback } from 'react';

import { Deserialize, RecoilURLSyncNext, Serialize } from 'lib/recoil';

import { RecoilRoot } from 'recoil';

import ExploreMap from 'containers/explore-map';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'TNC Foodscapes Explore Map | Towards Food System Transition';
const DESCRIPTION_TEXT =
  'Explaining what foodscapes are and how they can contribute to the transformation of the world food system.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const ExploreMapPage = () => {
  const serialize: Serialize = useCallback((x) => {
    return x === undefined ? '' : JSON.stringify(x);
  }, []);

  //Demo of custom deserialization
  const deserialize: Deserialize = useCallback((x: string) => {
    return JSON.parse(x);
  }, []);

  return (
    <RecoilRoot>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <RecoilURLSyncNext
        location={{ part: 'queryParams' }}
        serialize={serialize}
        deserialize={deserialize}
      >
        <ExploreMap />
      </RecoilURLSyncNext>
    </RecoilRoot>
  );
};

export default ExploreMapPage;
