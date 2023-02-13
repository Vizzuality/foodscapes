import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';

const LegendContainer = () => {
  return (
    <div className="absolute bottom-16 right-6">
      <Legend maxHeight={'80vh'}>
        <LegendItem id="test" name="Foodscapes">
          <div className="text-navy-500">Testing</div>
        </LegendItem>
      </Legend>
    </div>
  );
};

export default LegendContainer;
