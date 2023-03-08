import FadeYScroll from 'containers/home/animations/fadeYScroll';

const Text1 = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10 ">
      <FadeYScroll>
        <h2 className="font-display text-5xl">Think of it in layers.</h2>
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
