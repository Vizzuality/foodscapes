import Link from 'next/link';

import cn from 'lib/classnames';

import Wrapper from 'containers/wrapper';

const HeaderMap = () => {
  return (
    <header
      className={cn({
        'fixed top-0 z-30 w-full py-6': true,
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-center">
          {/* LOGO */}
          <Link
            href="/"
            className={cn({
              'py-1 font-display text-2xl text-navy-500 transition-colors': true,
            })}
          >
            Foodscapes
          </Link>
        </div>
      </Wrapper>
    </header>
  );
};

export default HeaderMap;
