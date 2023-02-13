import { useCallback } from 'react';

import Link from 'next/link';

import cn from 'lib/classnames';

import { menuOpenAtom } from 'store/explore-map';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { NAV } from 'constants/nav';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const Menu = () => {
  const menuOpen = useRecoilValue(menuOpenAtom);
  const setMenuOpen = useSetRecoilState(menuOpenAtom);

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const sidebarVariants = {
    initial: { x: '100%' },
    animate: {
      x: 0,
      transition: {
        duration: 0.25,
        delay: 0.125,
        ease: 'easeOut',
      },
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.25,
        delay: 0,
        ease: 'easeOut',
      },
    },
  };

  const handleClose = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="overlay"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={overlayVariants}
          className="bg-blur absolute top-0 left-0 h-full w-full bg-black/20"
          onClick={handleClose}
        />
      )}

      {menuOpen && (
        <motion.div
          key="sidebar"
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 right-0 h-full min-w-[300px] bg-white"
          variants={sidebarVariants}
        >
          <div className="flex items-center justify-between p-6">
            <Link
              href="/"
              className={cn({
                'py-1 font-display text-2xl text-navy-500 transition-colors': true,
              })}
            >
              Foodscapes
            </Link>

            <button className="h-6 w-6 text-navy-500" onClick={handleClose}>
              <Icon icon={CLOSE_SVG} />
            </button>
          </div>

          <div>
            <ul className="space-y-6 px-6">
              {NAV.map((item) => {
                const { label, href } = item;

                return (
                  <li key={href} className="">
                    <Link href={href}>{label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
