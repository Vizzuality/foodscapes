import { useCallback } from 'react';

import cn from 'lib/classnames';

import { menuOpenAtom, popupAtom } from 'store/explore-map';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Icon from 'components/icon';
import { CONTROL_BUTTON_STYLES } from 'components/map/controls/constants';
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import MENU_SVG from 'svgs/map/menu.svg?sprite';

const MenuControlsContainer = () => {
  const setMenuOpen = useSetRecoilState(menuOpenAtom);
  const resetPopup = useResetRecoilState(popupAtom);

  const onToogleMenu = useCallback(() => {
    setMenuOpen(true);
    resetPopup();
  }, [setMenuOpen, resetPopup]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          side="left"
          align="center"
          className="rounded-none border-navy-500 bg-navy-500"
        >
          <div className="text-xxs text-white">Menu</div>

          <TooltipArrow className="fill-navy-500" width={10} height={5} />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
};

export default MenuControlsContainer;
