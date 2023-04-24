import { ReactNode } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

interface BackgroundMobileProps {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  visible: boolean;
  Atributtion: ReactNode;
}

const BackgroundMobile = ({
  id,
  src,
  alt,
  width,
  height,
  visible,
  Atributtion,
}: BackgroundMobileProps) => {
  return (
    <motion.div
      key={id}
      className="absolute top-0 left-0 z-0 h-full w-full overflow-hidden"
      initial={{ opacity: 0, y: 88 }}
      animate={
        visible
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: 88,
            }
      }
      transition={{ duration: 0.5 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover"
        priority
      />

      <div className="absolute bottom-3 left-3">{Atributtion}</div>

      <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/25" />
    </motion.div>
  );
};

export default BackgroundMobile;
