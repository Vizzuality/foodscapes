import dynamic from 'next/dynamic';

import { WidgetTop } from 'containers/widget';

const Chart = dynamic(() => import('./chart'), { ssr: false });

const RisksWidget = () => {
  return (
    <section className="space-y-4 py-10">
      {/* <WidgetHeader title="Land Use Change" dataset={DATASET} /> */}
      <div className="space-y-2">
        <p className="font-light">
          Intensity groups are inclusive of the land management attributes of an area.
        </p>
      </div>

      <div className="flex h-64 flex-col items-center text-xs">
        <p className="font-bold">Climate Risk</p>

        <Chart selected />

        <p>
          <em>Showing </em>
          <b>
            <u>PROPORTION(%)</u>
          </b>
          / AREA (Mha)
        </p>
      </div>

      <WidgetTop label="See top affected foodscapes by climate risk">
        <p>test</p>
      </WidgetTop>
    </section>
  );
};

export default RisksWidget;
