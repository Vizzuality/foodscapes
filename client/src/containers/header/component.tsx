import Link from 'next/link';
import { useRouter } from 'next/router';

import cn from 'lib/classnames';

import { NAV } from 'constants/nav';

import Wrapper from 'containers/wrapper';

const THEMES = {
  dark: 'dark',
  light: 'light',
  'dark-light': 'dark-light',
  'light-dark': 'light-dark',
} as const;

type Theme = typeof THEMES[keyof typeof THEMES];

const Header = () => {
  const { pathname } = useRouter();

  const THEME = 'dark' as Theme;

  return (
    <header
      className={cn({
        'fixed top-0 z-30 w-full py-6': true,
        'bg-white/10 backdrop-blur-sm':
          THEME === 'light' || THEME === 'dark-light' || THEME === 'light-dark',
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className={cn({
              'font-display text-2xl text-navy-500 transition-colors': true,
              'text-white': THEME === 'light' || THEME === 'light-dark',
            })}
          >
            Foodscapes
          </Link>

          {/* NAV */}
          <nav className="flex items-center justify-between">
            <ul className="flex items-center justify-between space-x-4">
              {NAV.map((item) => {
                const { href, label, filled } = item;

                return (
                  <li key={href} className="relative">
                    <Link
                      href={href}
                      className={cn({
                        'block py-2 px-4 text-base font-semibold transition-colors': true,
                        // Default: dark
                        'text-navy-500 hover:text-navy-400 active:text-navy-500':
                          THEME === 'dark' || THEME === 'light-dark',
                        // Default: light
                        'text-white hover:text-navy-400 active:text-white':
                          THEME === 'light' || THEME === 'dark-light',

                        // Selected
                        'after:absolute after:bottom-0 after:left-4 after:h-0.5 after:w-[calc(100%_-_theme(space.8))] after:bg-navy-500':
                          pathname === href && (THEME === 'dark' || THEME === 'light-dark'),

                        // Filled: dark
                        'bg-navy-500 text-white hover:bg-navy-400 hover:text-white active:bg-navy-500 active:text-white':
                          filled && (THEME === 'dark' || THEME === 'light-dark'),
                        // Filled: light
                        'bg-white text-navy-500 hover:bg-navy-400 hover:text-navy-500 active:bg-white active:text-navy-500':
                          filled && (THEME === 'light' || THEME === 'dark-light'),
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
