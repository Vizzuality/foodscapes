import Link from 'next/link';

import cn from 'lib/classnames';

const HeaderMap = () => {
  return (
    <header
      className={cn({
        'fixed top-0 left-1/2 z-10 mx-auto flex -translate-x-1/2 items-center justify-center py-6':
          true,
      })}
    >
      {/* LOGO */}
      <Link
        href="/"
        className={cn({
          'py-1 font-display text-2xl text-white transition-colors': true,
          '[text-shadow:0_0_2px_rgba(0,0,0,1)]': true,
        })}
      >
        Foodscapes
      </Link>
    </header>
  );
};

export default HeaderMap;
