import { useSyncExploreMap } from 'store/explore-map';

import Sidebar from 'containers/explore-map/sidebar';

import { Media } from 'components/media-query';

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
      <Media greaterThanOrEqual="sm">
        <Layers />
      </Media>
      <Media greaterThanOrEqual="sm">
        <Sidebar />
      </Media>
    </div>
  );
};

export default ExploreMap;
