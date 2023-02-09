const Text1 = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10 ">
      <h2 className="font-display text-5xl">These layers overlap to create a foodscape.</h2>
      <div className="space-y-4">
        <p className="font-light">
          A foodscape is a specific area of food production, defined by the{' '}
          <strong className="font-semibold">
            combination of biophysical characteristics and management attributes in that area.
          </strong>
        </p>
        <p className="font-light">
          Simply put, a foodscape maps{' '}
          <strong className="font-semibold">a portion of the global food system</strong>,
          categorized by ecological and human influences.
        </p>
        <p className="font-light">
          At this time,{' '}
          <strong className="font-semibold">
            soy is being produced in several foodscapes around the world.
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Text1;
