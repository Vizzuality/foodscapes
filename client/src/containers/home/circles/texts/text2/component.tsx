import FadeYScroll from 'containers/animations/fadeYScroll';

const Text2 = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10 ">
      <FadeYScroll>
        <h2 className="font-display text-3xl">In 2010</h2>
      </FadeYScroll>

      <div className="space-y-4">
        <FadeYScroll>
          <p className="font-light">
            More than <strong className="font-semibold">240 million tons of soy</strong> was
            produced across nearly all 83 different foodscapes. Of that, almost{' '}
            <strong className="font-semibold">68% comes from intensive production systems</strong>,
            where field size is large and agricultural inputs are high.
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text2;
