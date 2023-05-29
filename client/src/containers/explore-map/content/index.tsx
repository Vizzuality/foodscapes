import { useEffect } from 'react';

import { contentAtom, contentOpenAtom } from 'store/explore-map';

import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { CaseStudiesDetail } from 'containers/case-studies';

const ANIMATION_DURATION = 500;

const Content = () => {
  const open = useRecoilValue(contentOpenAtom);
  const setOpen = useSetRecoilState(contentOpenAtom);

  const content = useRecoilValue(contentAtom);
  const resetContentAtom = useResetRecoilState(contentAtom);

  useEffect(() => {
    if (!content?.type) return;
    setOpen(true);
  }, [content, setOpen]);

  useEffect(() => {
    if (open) return;
    setTimeout(resetContentAtom, ANIMATION_DURATION);
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
            className="pointer-events-auto fixed left-0 top-0 h-full w-full max-w-[640px] bg-white"
          >
            <div className="flex h-full grow flex-col overflow-auto pb-10">
              {content?.type === 'case-study' && <CaseStudiesDetail id={content?.id} />}
            </div>
          </motion.div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default Content;
