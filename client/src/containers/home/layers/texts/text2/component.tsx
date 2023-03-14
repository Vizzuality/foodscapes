import FadeYScroll from 'containers/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10 ">
      <FadeYScroll>
        <h2 className="font-display text-4xl">Physical geography</h2>
      </FadeYScroll>
      <div className="space-y-4">
        <FadeYScroll>
          <p className="font-light">
            Distinct geographic features are the foundation of food production. This includes the
            soil makeup, climate, topography, land cover, freshwater access or the qualities of a
            seabed.
          </p>
        </FadeYScroll>
        <FadeYScroll>
          <p className="font-semibold">
            Soy favors midsummer mean temperatures of 24ºC to 25ºC (75ºF to 77ºF). It is often
            produced in the plains with deep fertile soils called Mollisols, or on tropical soils in
            South America.
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text2;
