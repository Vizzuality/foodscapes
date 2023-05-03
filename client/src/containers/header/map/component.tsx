import { useCallback } from 'react';

import Link from 'next/link';

import cn from 'lib/classnames';

import { menuOpenAtom } from 'store/menu';

import { useSetRecoilState } from 'recoil';

import { Theme } from 'types/header';

import Menu from 'containers/header/menu';
import { HEADER_BUTTON_STYLES } from 'containers/header/menu/constants';
import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';
import { Media } from 'components/media-query';

import MENU_SVG from 'svgs/map/menu.svg?sprite';

const Header = () => {
  const setMenuOpen = useSetRecoilState(menuOpenAtom);

  const onToogleMenu = useCallback(() => {
    setMenuOpen(true);
  }, [setMenuOpen]);

  const THEME = 'dark' as Theme;

  return (
    <header
      className={cn({
        'fixed top-0 left-0 z-30 w-full bg-white py-4 sm:left-1/2 sm:w-auto sm:-translate-x-1/2 sm:bg-transparent sm:py-6':
          true,
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between sm:justify-center">
          {/* LOGO */}
          {/* <Media lessThan="sm"> */}
          <Link
            href="/"
            className={cn({
              'block py-1 font-display text-2xl text-navy-500 transition-colors': true,
              'text-white': THEME === 'light' || THEME === 'light-dark',
            })}
          >
            Foodscapes
          </Link>
          {/* </Media> */}

          {/* NAV */}
          <Media lessThan="sm">
            <button
              className={cn({
                [HEADER_BUTTON_STYLES.default]: true,
                [HEADER_BUTTON_STYLES.hover]: true,
                [HEADER_BUTTON_STYLES.active]: true,
                [HEADER_BUTTON_STYLES.disabled]: false,
              })}
              aria-label="Toogle menu"
              type="button"
              disabled={false}
              onClick={onToogleMenu}
            >
              <Icon icon={MENU_SVG} className="h-full w-full" />
            </button>
          </Media>
        </div>
      </Wrapper>

      <Menu />
    </header>
  );
};

export default Header;
