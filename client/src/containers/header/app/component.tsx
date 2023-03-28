import { useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import cn from 'lib/classnames';

import { menuOpenAtom } from 'store/explore-map';

import { useSetRecoilState } from 'recoil';

import { Theme } from 'types/header';

import { NAV } from 'constants/nav';

import Menu from 'containers/explore-map/menu';
import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';
import { CONTROL_BUTTON_STYLES } from 'components/map/controls/constants';
import { Media } from 'components/media-query';

import MENU_SVG from 'svgs/map/menu.svg?sprite';

const Header = () => {
  const { pathname } = useRouter();
  const setMenuOpen = useSetRecoilState(menuOpenAtom);

  const onToogleMenu = useCallback(() => {
    setMenuOpen(true);
  }, [setMenuOpen]);

  const THEME = 'dark' as Theme;

  return (
    <header
      className={cn({
        'fixed top-0 z-30 w-full py-6': true,
        'bg-white': pathname === '/stories/argentina-gran-chaco' && THEME === 'dark',
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className={cn({
              'py-1 font-display text-2xl text-navy-500 transition-colors': true,
              'text-white': THEME === 'light' || THEME === 'light-dark',
            })}
          >
            Foodscapes
          </Link>

          {/* NAV */}
          <Media lessThan="sm">
            <button
              className={cn({
                [CONTROL_BUTTON_STYLES.default]: true,
                [CONTROL_BUTTON_STYLES.hover]: true,
                [CONTROL_BUTTON_STYLES.active]: true,
                [CONTROL_BUTTON_STYLES.disabled]: false,
              })}
              aria-label="Toogle menu"
              type="button"
              disabled={false}
              onClick={onToogleMenu}
            >
              <Icon icon={MENU_SVG} className="h-full w-full" />
            </button>
            <Menu />
          </Media>

          <Media greaterThanOrEqual="sm">
            <nav className="flex items-center justify-between">
              <ul className="flex items-center justify-between space-x-4">
                {NAV.filter((i) => i.href !== '/').map((item) => {
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
                          'text-navy-500 hover:text-navy-500 active:text-navy-500':
                            pathname === href && (THEME === 'dark' || THEME === 'light-dark'),

                          'after:absolute after:bottom-0 after:left-4 after:h-0.5 after:w-[calc(100%_-_theme(space.8))] after:bg-navy-500':
                            pathname === href && (THEME === 'dark' || THEME === 'light-dark'),

                          // Filled: dark
                          'bg-navy-500 text-white hover:bg-navy-500/90 hover:text-white active:bg-navy-500 active:text-white':
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
          </Media>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
