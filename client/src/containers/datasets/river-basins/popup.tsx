import { useMemo } from 'react';

import cn from 'lib/classnames';

import { formatHA } from 'hooks/utils';

interface RiverBasinsPopupProps {
  event: mapboxgl.MapLayerMouseEvent;
}

const RiverBasinsPopup = ({ event }: RiverBasinsPopupProps) => {
  const DATA = useMemo(() => {
    return event.features.find((f) => f.layer.source === 'river-basins-source');
  }, [event.features]);

  if (!DATA) return null;

  const { properties } = DATA;

  return (
    <div>
      <header className="flex items-center space-x-2">
        <div className="h-4 w-4 border-2 border-[#1E40AF]" />
        <h2 className="text-base font-semibold">River basins</h2>
      </header>

      <div className={cn({ 'mt-2 pl-6': true })}>
        <>
          {!DATA && <h3 className="text-sm font-light">No data</h3>}
          {!!DATA && (
            <dl className="space-y-1 text-sm font-light">
              <div>
                <dt className="underline">Name:</dt>
                <dd>{properties.SUB_NAME}</dd>
              </div>
              <div>
                <dt className="underline">Area:</dt>
                <dd>{formatHA(properties.SUB_AREA)}</dd>
              </div>
            </dl>
          )}
        </>
      </div>
    </div>
  );
};

export default RiverBasinsPopup;
