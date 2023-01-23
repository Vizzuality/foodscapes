import dynamic from 'next/dynamic';

import Map from 'containers/map';

const SQLProvider = dynamic(() => import('hooks/sql'), { ssr: false });

const MapPage: React.FC = () => (
  <SQLProvider>
    <Map />
  </SQLProvider>
);

export default MapPage;
