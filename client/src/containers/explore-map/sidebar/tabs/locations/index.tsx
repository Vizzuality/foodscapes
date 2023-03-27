import { forwardRef } from 'react';

const LocationsSidebar = forwardRef(() => {
  return (
    <section>
      <div className="w-full grow px-20">
        <h2 className="mb-4 text-2xl font-bold">Locations</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies
          lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet nisl. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia nisl nisl sit amet
          nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl condimentum nisl, nec lacinia
          nisl nisl sit amet nisl. Sed euismod, nisl nec
        </p>
      </div>
    </section>
  );
});

LocationsSidebar.displayName = 'LocationsSidebar';

export default LocationsSidebar;
