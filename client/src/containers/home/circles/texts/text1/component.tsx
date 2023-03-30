import FadeYScroll from 'containers/animations/fadeYScroll';

const Text1 = () => {
  return (
    <div className="flex flex-col justify-center space-y-3 pt-20 lg:h-small-screen lg:space-y-10 lg:pt-0 ">
      <FadeYScroll>
        <h2 className="font-display text-4xl lg:text-5xl">
          These layers overlap to create a foodscape.
        </h2>
      </FadeYScroll>

      <div className="space-y-4">
        <FadeYScroll>
          <p className="text-sm font-light lg:text-base">
            A foodscape is a specific area of food production, defined by the{' '}
            <strong className="font-semibold">
              combination of biophysical characteristics and management attributes in that area.
            </strong>
          </p>
        </FadeYScroll>

        <FadeYScroll>
          <p className="text-sm font-light lg:text-base">
            Simply put, a foodscape maps{' '}
            <strong className="font-semibold">a portion of the global food system</strong>,
            categorized by ecological and human influences.
          </p>
        </FadeYScroll>

        <FadeYScroll>
          <p className="text-sm  font-light lg:text-base">
            At this time,{' '}
            <strong className="font-semibold">
              soy is being produced in several foodscapes around the world.
            </strong>
          </p>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default Text1;
