import { useEffect, useRef } from 'react';

import { contentAtom, contentOpenAtom } from 'store/explore-map';

import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { CaseStudiesDetail } from 'containers/case-studies';

const ANIMATION_DURATION = 500;

const Content = () => {
  const timeout = useRef<NodeJS.Timeout>(null);

  const open = useRecoilValue(contentOpenAtom);
  const setOpen = useSetRecoilState(contentOpenAtom);

  const content = useRecoilValue(contentAtom);
  const resetContentAtom = useResetRecoilState(contentAtom);

  useEffect(() => {
    if (!content?.type) return;
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  }, [content, setOpen]);

  useEffect(() => {
    if (open) return;
    timeout.current = setTimeout(resetContentAtom, ANIMATION_DURATION);
  }, [open, resetContentAtom]);

  return (
    <Dialog modal={false} open={open}>
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
              initial: { x: open ? '0%' : '-100%' },
              animate: {
                x: '0%',
              },
              exit: {
                x: '-100%',
              },
            }}
            transition={{ duration: ANIMATION_DURATION / 1000, ease: 'easeInOut' }}
            className="pointer-events-auto absolute left-0 top-0 z-10 h-full w-full bg-white"
          >
            <div className="flex h-full grow flex-col overflow-y-auto pb-10">
              {content?.type === 'case-study' && <CaseStudiesDetail id={content?.id} />}
            </div>
          </motion.div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default Content;
