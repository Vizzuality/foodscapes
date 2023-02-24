import { useMemo } from 'react';

import { LngLat } from 'types/map';

import { usePointData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

interface FoodscapesPopupProps {
  latLng: LngLat;
}

const FoodscapesPopup = ({ latLng }: FoodscapesPopupProps) => {
  const { data: foodscapesData } = useFoodscapes();
  const { data: pointData } = usePointData(latLng, {
    keepPreviousData: false,
  });

  const FOODSCAPE = useMemo(() => {
    if (!foodscapesData || !pointData) return null;
    const band = 'b1';
    const value = pointData[band];

    return foodscapesData.find((d) => d.value === value);
  }, [foodscapesData, pointData]);

  return (
    <div>
      {FOODSCAPE && <h2>{FOODSCAPE.label}</h2>}
      {!FOODSCAPE && <h2>Loading...</h2>}
    </div>
  );
};

export default FoodscapesPopup;
