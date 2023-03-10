import { useCallback } from 'react';

import Image from 'next/image';

import cn from 'lib/classnames';

import { basemapAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

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
    <div className="flex items-center justify-between space-x-8 pr-1">
      <button className="group grow" type="button" onClick={handleToggleBasemap}>
        <div className="flex items-center space-x-4">
          <div
            className={cn({
              'shrink-0 overflow-hidden rounded-sm transition-opacity': true,
              'group-hover:opacity-75 group-active:outline group-active:outline-2 group-active:outline-navy-400':
                true,
              'outline outline-2 outline-navy-500 group-hover:opacity-100 group-active:outline-navy-500':
                value === basemap,
            })}
          >
            <Image src={preview} alt={label} width={40} height={33} className="rounded-sm" />
          </div>

          <span
            className={cn({
              'text-sm font-light text-navy-500 transition-colors': true,
              'group-hover:text-navy-400': true,
              'group-hover:text-navy-500': value === basemap,
            })}
          >
            {label}
          </span>
        </div>
      </button>
    </div>
  );
};

export default BasemapItem;
