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

      <a
        href="https://www.google.es/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-1/2 -right-9 z-10 hidden -rotate-90 rounded-md border border-navy-500 bg-white px-2 pb-4 text-sm transition-transform hover:-translate-x-2 sm:block"
      >
        Feedback
      </a>
    </div>
  );
};

export default ExploreMap;
