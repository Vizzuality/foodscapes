import Link from 'next/link';
import { useRouter } from 'next/router';

import cn from 'lib/classnames';

import { NAV } from 'constants/nav';

import Wrapper from 'containers/wrapper';

const Header = () => {
  const { pathname } = useRouter();

  return (
    <header
      className={cn({
        'fixed top-0 z-30 w-full py-6': true,
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="font-display text-2xl">
            Foodscapes
          </Link>

          {/* NAV */}
          <nav className="flex items-center justify-between">
            <ul className="flex items-center justify-between space-x-4">
              {NAV.map((item) => {
                const { href, label, filled } = item;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn({
                        'block py-2 px-4 text-base font-semibold text-navy transition-colors': true,
                        'hover:bg-gray-500/10': !pathname.includes(href),
                        'bg-navy text-white hover:bg-navy/75': filled,
                      })}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
