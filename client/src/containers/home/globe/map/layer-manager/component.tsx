import FoodscapesLayer from 'containers/datasets/foodscapes/layer';

const LayerManagerContainer = () => {
  return (
    <>
      <FoodscapesLayer
        settings={{
          opacity: 1,
          visibility: true,
          group: false,
        }}
      />
    </>
  );
};

export default LayerManagerContainer;
