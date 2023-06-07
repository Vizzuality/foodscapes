import { useMemo } from 'react';

import cn from 'lib/classnames';

import { WDPA_CATEGORIES } from 'containers/datasets/protected-areas/constants';

interface ProtectedAreasPopupProps {
  event: mapboxgl.MapLayerMouseEvent;
}

const ProtectedAreasPopup = ({ event }: ProtectedAreasPopupProps) => {
  const DATA = useMemo(() => {
    return event.features.find((f) => f.layer.source === 'protected-areas-source');
  }, [event.features]);

  if (!DATA) return null;

  const { properties } = DATA;

  return (
    <div>
      <header className="flex items-center space-x-2">
        <div
          className="h-4 w-4 border"
          style={{
            background: WDPA_CATEGORIES.find((c) => c.id === properties.IUCN_CA)?.color,
            borderColor: 'var(--color-navy-500)',
          }}
        />
        <h2 className="text-base font-semibold">Protected area</h2>
      </header>

      <div className={cn({ 'mt-2 pl-6': true })}>
        <>
          {!DATA && <h3 className="text-sm font-light">No data</h3>}
          {!!DATA && (
            <dl className="space-y-1 text-sm font-light">
              <div>
                <dt className="underline">Name:</dt>
                <dd>{properties.NAME}</dd>
              </div>
              <div>
                <dt className="underline">Category:</dt>
                <dd>{properties.IUCN_CA}</dd>
              </div>
              <div>
                <dt className="underline">Designation:</dt>
                <dd>{properties.DESIG_T}</dd>
              </div>
            </dl>
          )}
        </>
      </div>
    </div>
  );
};

export default ProtectedAreasPopup;
