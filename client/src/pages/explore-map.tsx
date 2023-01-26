import { useCallback } from 'react';

import { Deserialize, RecoilURLSyncNext, Serialize } from 'lib/recoil';

import { RecoilRoot } from 'recoil';

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
        <ExploreMap />
      </RecoilURLSyncNext>
    </RecoilRoot>
  );
};

export default ExploreMapPage;
