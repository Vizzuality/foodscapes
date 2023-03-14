import Wrapper from 'containers/wrapper';

const Risk = () => {
  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center">
      <Wrapper>
        <div className="grid grid-cols-12 items-end gap-6 pb-10">
          <div className="col-span-4 col-start-8">
            <div className="space-y-5 text-right">
              <h1 className="font-display text-4xl">Foodscapes at risk.</h1>
              <p className="font-light">
                <strong className="font-semibold">20% of the Argentinian Gran Chaco</strong> is
                already <strong className="font-semibold">affected by 1 or more risks.</strong> Some
                of these risks directly affect agriculture, others affect the integrity of the wider
                ecosystem.
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Risk;
