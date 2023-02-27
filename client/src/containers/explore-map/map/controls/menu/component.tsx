import { useCallback } from 'react';

import cn from 'lib/classnames';

import { menuOpenAtom } from 'store/explore-map';

import { useSetRecoilState } from 'recoil';

import Icon from 'components/icon';
import { CONTROL_BUTTON_STYLES } from 'components/map/controls/constants';

import MENU_SVG from 'svgs/map/menu.svg?sprite';

const MenuControlsContainer = () => {
  const setMenuOpen = useSetRecoilState(menuOpenAtom);

  const onToogleMenu = useCallback(() => {
    setMenuOpen(true);
  }, [setMenuOpen]);

  return (
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
  );
};

export default MenuControlsContainer;
