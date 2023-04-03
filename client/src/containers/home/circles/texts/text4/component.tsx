import FadeYScroll from 'containers/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex flex-col justify-center space-y-3 pt-20 lg:h-small-screen lg:space-y-10 lg:pt-0">
      <FadeYScroll>
        <h2 className="font-display text-2xl lg:text-4xl">A Globally Distributed Foodscape</h2>
      </FadeYScroll>
      <div className="space-y-4">
        <FadeYScroll>
          <p className="text-sm font-light lg:text-base">
            It is interesting to note that{' '}
            <strong className="font-semibold">the same foodscape</strong> favored by soy{' '}
            <strong className="font-semibold">
              accounts for 1.4% of the global agricultural landscape, spanning 5 continents.
            </strong>{' '}
            These similarities offer a good starting point to learn from and apply to similar
            foodscapes across the globe.
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text2;
