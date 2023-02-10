import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';

const LegendContainer = () => {
  return (
    <div className="absolute bottom-0 right-0">
      <Legend maxHeight={'80vh'}>
        <LegendItem id="test" name="name">
          <div className="text-white">Legend</div>
        </LegendItem>
      </Legend>
    </div>
  );
};

export default LegendContainer;
