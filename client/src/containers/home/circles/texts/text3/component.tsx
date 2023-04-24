import FadeYScroll from 'containers/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex flex-col justify-center space-y-3 pt-20 lg:h-small-screen lg:space-y-10 lg:pt-0">
      <FadeYScroll>
        <h2 className="font-display text-2xl lg:text-3xl">In 2010</h2>
      </FadeYScroll>
      <div className="space-y-2 lg:space-y-4">
        <FadeYScroll>
          <p className="text-sm font-light lg:text-base">
            Just one of these 83 different foodscapes produces{' '}
            <strong className="font-semibold">19% of soy globally</strong>. It is characterized by
            its deep fertile soils called Mollisols that are found in the world’s plains, its
            rainfed irrigation, and its single-cropped fields of cereal and oil. Let us focus on
            this foodscape.
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text2;
