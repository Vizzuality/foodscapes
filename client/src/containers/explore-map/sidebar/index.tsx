import { PropsWithChildren } from 'react';

import cn from 'lib/classnames';

import { sidebarOpenAtom } from 'store/explore-map';

import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Icon from 'components/icon';

import ARROW_LEFT_SVG from 'svgs/ui/arrow-left.svg?sprite';

const Sidebar = ({ children }: PropsWithChildren) => {
  const open = useRecoilValue(sidebarOpenAtom);
  const setOpen = useSetRecoilState(sidebarOpenAtom);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogContent
        asChild
        forceMount
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <>
          <motion.div
            key="sidebar"
            initial="initial"
            animate={open ? 'animate' : 'exit'}
            exit="exit"
            variants={{
              initial: { x: '0%' },
              animate: {
                x: '0%',
              },
              exit: {
                x: '-100%',
              },
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="pointer-events-auto fixed left-0 top-0 h-full w-full max-w-xl bg-white"
          >
            {children}

            <DialogTrigger asChild>
              <button className="absolute bottom-16 left-full flex h-8 w-8 items-center justify-center bg-navy-500 hover:bg-navy-400">
                <Icon
                  icon={ARROW_LEFT_SVG}
                  className={cn({
                    'h-3 w-3 text-white transition-transform': true,
                    'rotate-180': !open,
                  })}
                />
              </button>
            </DialogTrigger>
          </motion.div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default Sidebar;
