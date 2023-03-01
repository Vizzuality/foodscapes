import { useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import cn from 'lib/classnames';

import { menuOpenAtom } from 'store/explore-map';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { NAV } from 'constants/nav';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const Menu = () => {
  const { pathname } = useRouter();

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
          className="absolute top-0 left-0 z-10 h-full w-full bg-black/25"
          onClick={handleClose}
        />
      )}

      {menuOpen && (
        <motion.div
          key="sidebar"
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 right-0 z-20 h-full w-full max-w-[300px] bg-white shadow-lg"
          variants={sidebarVariants}
        >
          <div className="flex h-full flex-col justify-between space-y-10">
            <nav>
              <div className="flex items-center justify-between p-6">
                <Link
                  href="/"
                  className={cn({
                    'py-1 font-display text-2xl text-navy-500 transition-colors': true,
                  })}
                >
                  Foodscapes
                </Link>

                <button
                  className="flex h-6 w-6 items-center justify-center text-navy-500"
                  onClick={handleClose}
                >
                  <Icon icon={CLOSE_SVG} />
                </button>
              </div>

              <div>
                <ul className="space-y-6 px-6">
                  {NAV.map((item) => {
                    const { label, href } = item;

                    return (
                      <li key={href} className="">
                        <Link
                          href={href}
                          className={cn({
                            // Default: dark
                            'relative text-navy-500 hover:text-navy-400 active:text-navy-500': true,

                            // Selected
                            'text-navy-500 hover:text-navy-500 active:text-navy-500':
                              pathname === href,
                            'after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-navy-500':
                              pathname === href,
                          })}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            <footer className="space-y-10 p-6 text-sm font-light text-navy-500">
              <div className="space-y-2">
                {/* <p>If you would like to provide feedback please contact us at xxxxx@xxxxxxxx.</p> */}
                <p>© {new Date().getFullYear()} Foodscapes by The Nature Conservancy</p>
              </div>

              <div className="flex divide-x">
                <Link href="/terms-of-use" className="pr-2">
                  Terms of Use
                </Link>
                <Link href="/privacy-policy" className="pl-2">
                  Privacy policy
                </Link>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
