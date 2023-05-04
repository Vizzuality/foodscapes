import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./chart'), { ssr: false });

const RisksLandUseWidget = () => {
  return (
    <section className="space-y-4 py-10">
      {/* <WidgetHeader title="Land Use Change" dataset={DATASET} /> */}
      <div className="space-y-2">
        <p className="font-light">
          This analysis examines the relationships between land use changes and foodscapes by
          examining where and how foodscapes intersect with the following indices.
        </p>
      </div>

      <div className="h-64">
        <Chart selected />
      </div>
    </section>
  );
};

export default RisksLandUseWidget;
