import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { NAV } from 'constants/nav';

import Wrapper from 'containers/wrapper';

const Header = () => {
  const { pathname } = useRouter();

  return (
    <header
      className={cx({
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
                      className={cx({
                        'block py-2 px-4 text-base font-semibold transition-colors': true,
                        'hover:bg-slate-500/25': !pathname.includes(href),
                        'bg-blue-500 text-white': filled,
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
