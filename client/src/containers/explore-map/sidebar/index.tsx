import Link from 'next/link';

import cn from 'lib/classnames';

import { sidebarOpenAtom, tabAtom, contentOpenAtom } from 'store/explore-map';

import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Tabs, TabsContent, TabsList, TabsTrigger } from 'containers/explore-map/sidebar/tabs';
import CaseStudiesSidebar from 'containers/explore-map/sidebar/tabs/case-studies';
import FoodscapesSidebar from 'containers/explore-map/sidebar/tabs/foodscapes';
import LocationsSidebar from 'containers/explore-map/sidebar/tabs/locations';
import OpportunitiesSidebar from 'containers/explore-map/sidebar/tabs/opportunities';
import RisksSidebar from 'containers/explore-map/sidebar/tabs/risks';

import Icon from 'components/icon';

import ARROW_LEFT_SVG from 'svgs/ui/arrow-left.svg?sprite';

const Sidebar = () => {
  const open = useRecoilValue(sidebarOpenAtom);
  const setOpen = useSetRecoilState(sidebarOpenAtom);

  const tab = useRecoilValue(tabAtom);
  const setTab = useSetRecoilState(tabAtom);

  const contentOpen = useRecoilValue(contentOpenAtom);

  let motionVariant = open ? 'open' : 'exit';

  if (contentOpen) {
    motionVariant = 'reduced';
  }

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
            initial={motionVariant}
            animate={motionVariant}
            exit="exit"
            variants={{
              open: {
                x: '0%',
              },
              reduced: {
                x: '-5%',
              },
              exit: {
                x: '-100%',
              },
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="pointer-events-auto fixed left-0 top-0 h-full w-full max-w-[640px] bg-white"
          >
            <Tabs value={tab} onValueChange={setTab} asChild>
              <div className="flex h-full grow flex-col overflow-auto">
                <TabsList className="relative z-10 w-full">
                  <TabsTrigger value="foodscapes" />
                  <TabsTrigger value="risks" />
                  <TabsTrigger value="opportunities" />
                  <TabsTrigger value="locations" />
                  <TabsTrigger value="case-studies" />
                </TabsList>

                <div className="relative z-0 -mt-20 flex grow flex-col">
                  <TabsContent value="foodscapes">
                    <FoodscapesSidebar />
                  </TabsContent>

                  <TabsContent value="risks">
                    <RisksSidebar />
                  </TabsContent>

                  <TabsContent value="opportunities">
                    <OpportunitiesSidebar />
                  </TabsContent>

                  <TabsContent value="locations">
                    <LocationsSidebar />
                  </TabsContent>

                  <TabsContent value="case-studies">
                    <CaseStudiesSidebar />
                  </TabsContent>
                </div>
              </div>
            </Tabs>

            <Link
              href="/"
              className={cn({
                'absolute top-5 left-full hidden translate-x-8 py-1 font-display text-2xl text-navy-500 sm:block':
                  true,
                'transition-[colors,transform_0.5s] ease-in-out': true,
                'translate-x-8': motionVariant !== 'reduced',
                'translate-x-16': motionVariant === 'reduced',
              })}
            >
              Foodscapes
            </Link>

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
