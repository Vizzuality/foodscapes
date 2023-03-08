import FadeYScroll from 'containers/home/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10 ">
      <FadeYScroll>
        <h2 className="font-display text-3xl">In 2010</h2>
      </FadeYScroll>
      <div className="space-y-4">
        <FadeYScroll>
          <p className="font-light">
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
