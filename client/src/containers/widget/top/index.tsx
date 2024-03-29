import { PropsWithChildren, useState } from 'react';

import cn from 'lib/classnames';

import Icon from 'components/icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'components/ui/collapsible';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

export interface WidgetTopProps extends PropsWithChildren {
  label: string;
}

const WidgetTop = ({ label, children }: WidgetTopProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <CollapsibleTrigger className="mt-5 flex items-center space-x-2 font-semibold text-navy-500 hover:underline">
        <span className="text-sm">{label}</span>

        <Icon
          icon={ARROW_DOWN_SVG}
          className={cn({
            'relative top-px h-2 w-2 text-navy-500 transition-transform': true,
            'rotate-180': open,
          })}
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="relative mt-2.5 min-h-[40px]">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WidgetTop;
