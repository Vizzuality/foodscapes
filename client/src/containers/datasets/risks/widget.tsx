import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./chart'), { ssr: false });

const RisksWidget = () => {
  return (
    <section className="space-y-4 py-10">
      <div className="space-y-2">
        <p className="font-light">
          Intensity groups are inclusive of the land management attributes of an area.
        </p>
      </div>

      <div className="h-64">
        <Chart selected />
      </div>
    </section>
  );
};

export default RisksWidget;
