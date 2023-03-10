import FadeYScroll from 'containers/home/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10 ">
      <FadeYScroll>
        <h2 className="font-display text-4xl">Management patterns</h2>
      </FadeYScroll>
      <div className="space-y-4">
        <FadeYScroll>
          <p className="font-light">
            This layer encompasses the practices producers use to grow food, such as irrigation
            techniques, tillage or the level of nutrient inputs.
          </p>
        </FadeYScroll>
        <FadeYScroll>
          <p className="font-semibold">
            Almost all soy is rainfed, and a large majority is produced in high-intensity systems,
            where field size is large and agricultural inputs are high. Over the last 30 years,
            global demand for soy (and beef) has driven the conversion of millions of acres of
            native habitat and forests.
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text2;
