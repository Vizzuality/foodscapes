import { useCallback, useState } from 'react';

import { ViewState } from 'react-map-gl';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import { CustomMapProps } from 'components/map/types';

const DEFAULT_PROPS: CustomMapProps = {
  id: 'default',
  initialViewState: {
    latitude: 0,
    longitude: 0,
    zoom: 1,
  },
  maxZoom: 20,
};

const ExploreMap = () => {
  const { id, initialViewState, maxZoom } = DEFAULT_PROPS;
  const [viewState, setViewState] = useState<Partial<ViewState>>({});

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  return (
    <div className="relative h-screen w-full">
      <Map
        id={id}
        maxZoom={maxZoom}
        initialViewState={initialViewState}
        viewState={viewState}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={handleViewState}
      >
        {(map) => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            <Layer
              id="foodscapes"
              type="raster"
              source={{
                type: 'raster',
                tiles: [
                  'https://ec2-13-39-86-123.eu-west-3.compute.amazonaws.com/tiler/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=/opt/foodscapes-tiler/data/foodscapes_stack_cog_lzw.tif&colormap=%7B%221%22%3A+%22%23BCBCBC%22%2C+%222%22%3A+%22%23FF2A00%22%2C+%223%22%3A+%22%23ADD8E6%22%2C+%22101%22%3A+%22%23FFEBBE%22%2C+%22102%22%3A+%22%23F9E5BA%22%2C+%22103%22%3A+%22%23F4E0B5%22%2C+%22104%22%3A+%22%23E3CFA8%22%2C+%22105%22%3A+%22%23D2BE9A%22%2C+%22109%22%3A+%22%23CCB896%22%2C+%22110%22%3A+%22%23BDAA8B%22%2C+%22201%22%3A+%22%23BED2FF%22%2C+%22202%22%3A+%22%2396A9DA%22%2C+%22203%22%3A+%22%238495C7%22%2C+%22204%22%3A+%22%237282B4%22%2C+%22205%22%3A+%22%236270A1%22%2C+%22206%22%3A+%22%23536089%22%2C+%22209%22%3A+%22%23363F6E%22%2C+%22210%22%3A+%22%232B3257%22%2C+%22301%22%3A+%22%23F50000%22%2C+%22304%22%3A+%22%23E00000%22%2C+%22306%22%3A+%22%23D40000%22%2C+%22401%22%3A+%22%23D1B06F%22%2C+%22402%22%3A+%22%23C29F5C%22%2C+%22403%22%3A+%22%23A5813A%22%2C+%22404%22%3A+%22%2396722C%22%2C+%22406%22%3A+%22%23876420%22%2C+%22407%22%3A+%22%23795715%22%2C+%22408%22%3A+%22%236A4A0C%22%2C+%22409%22%3A+%22%235B3E05%22%2C+%22410%22%3A+%22%233B2700%22%2C+%22501%22%3A+%22%23D9CA77%22%2C+%22504%22%3A+%22%23B1A241%22%2C+%22506%22%3A+%22%23A49632%22%2C+%22508%22%3A+%22%23978925%22%2C+%22509%22%3A+%22%237D700F%22%2C+%22510%22%3A+%22%236F6407%22%2C+%22601%22%3A+%22%23D4F0FF%22%2C+%22602%22%3A+%22%23B3DDF2%22%2C+%22603%22%3A+%22%2394CBE5%22%2C+%22604%22%3A+%22%2377BAD8%22%2C+%22605%22%3A+%22%2372B3CF%22%2C+%22606%22%3A+%22%235398B3%22%2C+%22607%22%3A+%22%23007EA1%22%2C+%22609%22%3A+%22%23006783%22%2C+%22610%22%3A+%22%23005168%22%2C+%22701%22%3A+%22%23FFD9D9%22%2C+%22702%22%3A+%22%23EFB4B4%22%2C+%22703%22%3A+%22%23DE9393%22%2C+%22704%22%3A+%22%23CE7575%22%2C+%22705%22%3A+%22%23BD5959%22%2C+%22706%22%3A+%22%23A64E4E%22%2C+%22707%22%3A+%22%23904444%22%2C+%22708%22%3A+%22%23803C3C%22%2C+%22709%22%3A+%22%23700000%22%2C+%22710%22%3A+%22%23560000%22%2C+%22801%22%3A+%22%23CCCCCC%22%2C+%22802%22%3A+%22%23B3B3B3%22%2C+%22803%22%3A+%22%23999999%22%2C+%22804%22%3A+%22%234D4D4D%22%2C+%22901%22%3A+%22%23BED2FF%22%2C+%22902%22%3A+%22%239FAFEF%22%2C+%22903%22%3A+%22%236967D0%22%2C+%22904%22%3A+%22%235A58B3%22%2C+%22905%22%3A+%22%235352A6%22%2C+%22906%22%3A+%22%23443B8E%22%2C+%22909%22%3A+%22%235128A2%22%2C+%22910%22%3A+%22%234F1892%22%2C+%221001%22%3A+%22%23DBF0B3%22%2C+%221002%22%3A+%22%23C5DF93%22%2C+%221003%22%3A+%22%23A3CA53%22%2C+%221004%22%3A+%22%2393B44A%22%2C+%221005%22%3A+%22%23699D00%22%2C+%221006%22%3A+%22%23568100%22%2C+%221007%22%3A+%22%23507800%22%2C+%221009%22%3A+%22%23446600%22%2C+%221010%22%3A+%22%23395700%22%2C+%221101%22%3A+%22%23F5F57A%22%2C+%221102%22%3A+%22%23E5E565%22%2C+%221103%22%3A+%22%23D5D553%22%2C+%221104%22%3A+%22%23C8C84D%22%2C+%221105%22%3A+%22%23A0A035%22%2C+%221106%22%3A+%22%238C8C0F%22%2C+%221107%22%3A+%22%23979729%22%2C+%221108%22%3A+%22%23666600%22%2C+%221109%22%3A+%22%23595900%22%2C+%221110%22%3A+%22%235B5B00%22%7D&bidx=8',
                ],
                tileSize: 256,
              }}
            />
          </LayerManager>
        )}
      </Map>
    </div>
  );
};

export default ExploreMap;
