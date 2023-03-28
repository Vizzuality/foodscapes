import FadeYScroll from 'containers/animations/fadeYScroll';

const Text1 = () => {
  return (
    <div className="flex flex-col justify-center space-y-5 lg:h-small-screen lg:space-y-10 ">
      <FadeYScroll>
        <h2 className="font-display text-4xl lg:text-5xl">Think of it in layers.</h2>
      </FadeYScroll>

      <div className="space-y-4">
        <FadeYScroll>
          <p className="font-light">
            Food production is defined by a region’s environmental conditions, farming practices,
            market forces, distribution challenges, public policies and local communities and
            cultures. This context can be clustered into three main layers.
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text1;
