import { useMemo, useRef } from 'react';

import Link from 'next/link';

import { GAEvent } from 'lib/analytics/ga';
import cn from 'lib/classnames';

import { caseStudyAtom, sidebarOpenAtom, tabAtom } from 'store/explore-map';

import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CaseStudiesDetail } from 'containers/case-studies';
import Filters from 'containers/explore-map/filters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'containers/explore-map/sidebar/tabs';
import CaseStudiesSidebar from 'containers/explore-map/sidebar/tabs/case-studies';
import FoodscapesSidebar from 'containers/explore-map/sidebar/tabs/foodscapes';
import LocationsSidebar from 'containers/explore-map/sidebar/tabs/locations';
import OpportunitiesSidebar from 'containers/explore-map/sidebar/tabs/opportunities';
import RisksSidebar from 'containers/explore-map/sidebar/tabs/risks';

import Icon from 'components/icon';

import ARROW_LEFT_SVG from 'svgs/ui/arrow-left.svg?sprite';

const Sidebar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const open = useRecoilValue(sidebarOpenAtom);
  const setOpen = useSetRecoilState(sidebarOpenAtom);

  const tab = useRecoilValue(tabAtom);
  const setTab = useSetRecoilState(tabAtom);

  const caseStudy = useRecoilValue(caseStudyAtom);

  useMemo(() => {
    if (scrollRef.current && tab && caseStudy) {
      scrollRef.current.scrollTop = 0;
    }
  }, [tab, caseStudy]);

  const handleTabChange = (value: string) => {
    setTab(value);

    GAEvent({
      action: 'tab_selected',
      params: {
        type: value,
      },
    });
  };

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
          className="pointer-events-auto fixed left-0 top-0 h-full w-full max-w-[640px] bg-white"
        >
          <Tabs value={tab} onValueChange={handleTabChange} asChild>
            <div
              ref={scrollRef}
              className="flex h-full grow flex-col overflow-y-auto overflow-x-hidden"
            >
              <div className="relative z-10 px-20 py-5">
                <Link
                  href="/"
                  className={cn({
                    'py-1 font-display text-3xl text-navy-500 transition-colors': true,
                  })}
                >
                  Foodscapes
                </Link>
              </div>

              <TabsList className="relative z-10 w-full">
                <TabsTrigger value="foodscapes" />
                <TabsTrigger value="risks" />
                <TabsTrigger value="opportunities" />
                <TabsTrigger value="locations" />
                <TabsTrigger value="case-studies" />
              </TabsList>

              <div className="relative z-0 -mt-60 flex grow flex-col">
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
                  <AnimatePresence mode="wait">
                    {caseStudy && (
                      <CaseStudiesDetail key="case-study-detail-sidebar" id={caseStudy} />
                    )}
                    {!caseStudy && <CaseStudiesSidebar key="case-study-sidebar" />}
                  </AnimatePresence>
                </TabsContent>
              </div>

              <Filters />
            </div>
          </Tabs>

          <DialogTrigger asChild>
            <button
              type="button"
              aria-label={open ? 'Close sidebar' : 'Open sidebar'}
              className="absolute bottom-16 left-full flex h-8 w-8 items-center justify-center bg-navy-500 hover:bg-navy-400"
            >
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
      </DialogContent>
    </Dialog>
  );
};

export default Sidebar;
