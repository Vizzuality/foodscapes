import { useCallback } from 'react';

import { Deserialize, RecoilURLSyncNext, Serialize } from 'lib/recoil';

import { RecoilRoot } from 'recoil';

import SyncUrl from 'containers/sync-url';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const SyncUrlPage = () => {
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
        <SyncUrl />
      </RecoilURLSyncNext>
    </RecoilRoot>
  );
};

export default SyncUrlPage;
