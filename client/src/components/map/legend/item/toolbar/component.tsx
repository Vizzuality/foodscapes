import cn from 'lib/classnames';

import { PopoverArrow } from '@radix-ui/react-popover';

import Icon from 'components/icon';
import { LegendItemToolbarProps } from 'components/map/legend/types';
import Slider from 'components/slider';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';

import OPACITY_SVG from 'svgs/legend/opacity.svg?sprite';
import VISIBILITY_SVG from 'svgs/legend/visibility.svg?sprite';

export const LegendItemToolbar: React.FC<LegendItemToolbarProps> = ({
  settingsManager,
  settings,
  onChangeOpacity,
  onChangeVisibility,
}: LegendItemToolbarProps) => {
  const { opacity = 1, visibility = true } = settings || {};

  return (
    <div className="flex space-x-1">
      {settingsManager?.opacity && (
        <div className="flex">
          <Popover>
            <PopoverTrigger type="button">
              <Icon
                className={cn({
                  'flex h-4 w-4 items-center justify-center text-navy-500': true,
                  'text-gray-300': !visibility,
                })}
                icon={OPACITY_SVG}
              />
            </PopoverTrigger>

            <PopoverContent side="top" className="border-navy-500 bg-navy-500">
              <Slider
                className="w-full"
                defaultValue={[opacity]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(value) => {
                  if (onChangeOpacity) onChangeOpacity(value[0], settings);
                }}
              />

              <PopoverArrow className="fill-navy-500" width={11} height={5} />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {settingsManager?.visibility && (
        <div className="flex">
          <button
            type="button"
            onClick={() => {
              if (onChangeVisibility) onChangeVisibility(!visibility, settings);
            }}
          >
            <Icon
              className={cn({
                'flex h-4 w-4 items-center justify-center text-navy-500': true,
                'text-gray-300': !visibility,
              })}
              icon={visibility ? VISIBILITY_SVG : VISIBILITY_SVG}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default LegendItemToolbar;
