import { useCallback } from 'react';

import Image from 'next/image';

import cn from 'lib/classnames';

import { basemapAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import Icon from 'components/icon';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

export interface BasemapItemProps {
  label: string;
  value: string;
  url: string;
  preview: string;
}

const BasemapItem = ({ label, value, preview }) => {
  const basemap = useRecoilValue(basemapAtom);
  const setBasemap = useSetRecoilState(basemapAtom);

  const handleToggleBasemap = useCallback(() => {
    setBasemap(value);
  }, [value, setBasemap]);

  return (
    <div className="flex items-center justify-between space-x-2">
      <button className="grow" type="button" onClick={handleToggleBasemap}>
        <div className="flex items-center space-x-4">
          <div
            className={cn({
              'shrink-0 overflow-hidden rounded-sm': true,
              'outline outline-2 outline-navy-500': value === basemap,
            })}
          >
            <Image src={preview} alt={label} width={40} height={33} className="rounded-sm" />
          </div>

          <span className="text-sm font-light">{label}</span>
        </div>
      </button>

      <button type="button" className="h-3 w-3">
        <Icon
          icon={INFO_SVG}
          className={cn({
            'h-full w-full text-navy-500 ': true,
            'rounded-full hover:text-navy-400 active:text-navy-500 active:outline active:outline-1 active:outline-navy-400':
              true,
          })}
        />
      </button>
    </div>
  );
};

export default BasemapItem;
