import { ReactElement, useCallback } from 'react';

import { Deserialize, RecoilURLSyncNext, Serialize } from 'lib/recoil';
import RecoilDevTools from 'lib/recoil/devtools';

import { RecoilRoot } from 'recoil';

import LayoutMap from 'layouts/map';

import ExploreMap from 'containers/explore-map';
import MetaIcons from 'containers/meta-icons';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'Foodscapes Map | Regenerative Food Systems for People and Nature';
const DESCRIPTION_TEXT =
  'Explore diverse food production systems worldwide with the interactive Foodscapes Map. Explore the diverse foodscape classes identified through our research, filter layers, analyze opportunities and risks of regenerative food systems, and search by individual countries. Do your own analysis and join The Nature Conservancy´s and its partners’ global effort to transform the food system.';
const IMAGE_URL = 'images/meta/map.jpg';

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
      <RecoilURLSyncNext
        location={{ part: 'queryParams' }}
        serialize={serialize}
        deserialize={deserialize}
      >
        <RecoilDevTools />

        <MetaTags
          title={TITLE_TEXT}
          description={DESCRIPTION_TEXT}
          type="website"
          imageURL={IMAGE_URL}
        />
        <MetaIcons />

        <ExploreMap />
      </RecoilURLSyncNext>
    </RecoilRoot>
  );
};

ExploreMapPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMap>{page}</LayoutMap>;
};

export default ExploreMapPage;
