import FadeYScroll from 'containers/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex flex-col justify-center space-y-2 pt-20 lg:h-small-screen lg:space-y-10 lg:pt-0 ">
      <FadeYScroll>
        <h2 className="font-display text-4xl">Socioeconomic influences</h2>
      </FadeYScroll>
      <div className="space-y-4">
        <FadeYScroll>
          <p className="text-sm font-light lg:text-base">
            This layer zooms out to contextualize the foodscape by including market forces,
            distribution challenges, public policies and local communities and cultures.
          </p>
        </FadeYScroll>
        <FadeYScroll>
          <p className="text-sm font-semibold lg:text-base">
            More than three-quarters of global soy is fed to livestock for meat and dairy
            production. Most of the rest is used for biofuels, industry or vegetable oils. Just 7%
            of soy is used directly for human food products such as tofu, soy milk, edamame beans
            and tempeh.
          </p>
        </FadeYScroll>
        <FadeYScroll>
          <p className="text-xs font-light italic lg:text-sm">Source: Soy - Our World in Data.</p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text2;
