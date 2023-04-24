import FadeYScroll from 'containers/animations/fadeYScroll';

const GlobeText = () => {
  return (
    <div className="flex flex-col justify-center  space-y-3 pt-20 lg:h-small-screen lg:space-y-10 lg:pt-0 ">
      <FadeYScroll>
        <h2 className="font-display text-4xl lg:text-5xl">Why think of soy in foodscapes?</h2>
      </FadeYScroll>
      <div className="space-y-2 lg:space-y-4">
        <FadeYScroll>
          <p className="text-sm font-light lg:text-base">
            Mapping and analyzing foodscapes reveal the{' '}
            <strong className="font-semibold">
              food system transitions needed to meet this century’s most pressing challenges
            </strong>
            : the threats posed by the climate crisis, biodiversity loss, and increased demand for
            the integrity of the global food system.
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default GlobeText;
