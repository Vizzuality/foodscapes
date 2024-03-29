import FadeYScroll from 'containers/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex flex-col justify-center space-y-2 pt-20 lg:h-small-screen lg:space-y-10 lg:pt-0">
      <FadeYScroll>
        <h2 className="font-display text-4xl">Management patterns</h2>
      </FadeYScroll>
      <div className="space-y-4">
        <FadeYScroll>
          <p className="text-sm font-light lg:text-base">
            This layer encompasses the practices producers use to grow food, such as irrigation
            techniques, tillage or the level of nutrient inputs.
          </p>
        </FadeYScroll>
        <FadeYScroll>
          <p className="text-sm font-semibold lg:text-base">
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
