import { ReactElement, useCallback } from 'react';

import { Deserialize, RecoilURLSyncNext, Serialize } from 'lib/recoil';
import RecoilDevTools from 'lib/recoil/devtools';

import { RecoilRoot } from 'recoil';

import LayoutMap from 'layouts/map';

import ExploreMap from 'containers/explore-map';

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

        <ExploreMap />
      </RecoilURLSyncNext>
    </RecoilRoot>
  );
};

ExploreMapPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMap>{page}</LayoutMap>;
};

export default ExploreMapPage;
