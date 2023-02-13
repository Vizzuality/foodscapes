import Layers from './layers';
import Legend from './legend';
import Map from './map';
import Menu from './menu';

const ExploreMap = () => {
  return (
    <div className="relative h-screen w-full">
      <Map />
      <Legend />
      <Menu />
      <Layers />
    </div>
  );
};

export default ExploreMap;
