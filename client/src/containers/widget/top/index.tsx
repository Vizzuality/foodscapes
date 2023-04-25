import { PropsWithChildren, useState } from 'react';

import cn from 'lib/classnames';

import Icon from 'components/icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'components/ui/collapsible';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

export interface WidgetTopProps extends PropsWithChildren {
  label: string;
}

const WidgetTop = ({ label, children }: WidgetTopProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <CollapsibleTrigger className="mt-5 flex items-center space-x-2 font-semibold text-navy-500 hover:underline">
        <span>{label}</span>

        <Icon
          icon={ARROW_DOWN_SVG}
          className={cn({
            'relative top-px h-3 w-3 text-navy-500 transition-transform': true,
            'rotate-180': open,
          })}
        />
      </CollapsibleTrigger>

      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default WidgetTop;
