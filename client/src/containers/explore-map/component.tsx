import { useSyncExploreMap } from 'store/explore-map';

import Sidebar from 'containers/explore-map/sidebar';

import Menu from '../header/menu';

import Layers from './layers';
import Legend from './legend';
import Map from './map';

const ExploreMap = () => {
  useSyncExploreMap();

  return (
    <div className="relative h-screen w-full">
      <Map />
      <Legend />
      <Menu />
      <Layers />
      <Sidebar />
    </div>
  );
};

export default ExploreMap;
