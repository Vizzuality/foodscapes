import FadeYScroll from 'containers/animations/fadeYScroll';

const HowText = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10">
      <FadeYScroll>
        <h2 className="font-display text-6xl">How do we feed the world?</h2>
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
