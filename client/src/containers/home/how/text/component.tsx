import FadeYScroll from 'containers/animations/fadeYScroll';

const HowText = () => {
  return (
    <div className="flex flex-col space-y-4 pt-20 lg:h-small-screen lg:justify-center lg:space-y-10 lg:pt-0">
      <FadeYScroll>
        <h2 className="font-display text-5xl lg:text-6xl">How do we feed the world?</h2>
      </FadeYScroll>

      <div className="space-y-4">
        <FadeYScroll>
          <p className="font-light">
            The need for food is a universal constant, but how it’s produced is different across the
            globe.
          </p>
        </FadeYScroll>
        <FadeYScroll>
          <p className="font-light">
            To understand this, let’s explore the{' '}
            <strong className="font-semibold">production of soy.</strong>
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default HowText;
