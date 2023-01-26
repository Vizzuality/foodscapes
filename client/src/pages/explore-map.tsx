import { initializeState } from 'store/explore-map';

import { RecoilRoot } from 'recoil';
import { RecoilURLSyncJSONNext } from 'recoil-sync-next';

import ExploreMap from 'containers/explore-map';

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}

const ExploreMapPage = ({ query }) => (
  <RecoilRoot initializeState={initializeState(query)}>
    <RecoilURLSyncJSONNext location={{ part: 'queryParams' }}>
      <ExploreMap />
    </RecoilURLSyncJSONNext>
  </RecoilRoot>
);

export default ExploreMapPage;
