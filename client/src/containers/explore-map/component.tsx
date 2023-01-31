import { useCallback, useState } from 'react';

import { ViewState } from 'react-map-gl';

import Map from 'components/map';
import { CustomMapProps } from 'components/map/types';

const DEFAULT_PROPS: CustomMapProps = {
  id: 'default',
  initialViewState: {
    latitude: 0,
    longitude: 0,
    zoom: 1,
  },
  bounds: undefined,
  maxZoom: 20,
};

const ExploreMap = () => {
  const { id, initialViewState, bounds, maxZoom } = DEFAULT_PROPS;
  const [viewState, setViewState] = useState<Partial<ViewState>>({});

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  return (
    <div className="relative h-screen w-full">
      <Map
        id={id}
        maxZoom={maxZoom}
        bounds={bounds}
        initialViewState={initialViewState}
        viewState={viewState}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={handleViewState}
      >
        {() => null}
      </Map>
    </div>
  );
};

export default ExploreMap;
