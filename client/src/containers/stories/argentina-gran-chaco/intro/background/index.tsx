import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const IntroBackground = () => {
  const document = typeof window !== 'undefined' ? window.document : null;
  const ref = useRef(document?.getElementById('scroll-0'));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 0', '0.5 0'],
  });

  const backgroundPosition = useTransform(scrollYProgress, (v) => `${v * -200}px 100%`);

  return (
    <motion.div
      key="background"
      className="fixed z-0 h-full w-full overflow-hidden bg-fixed bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/stories/argentina-gran-chaco/granchaco-1.jpg)',
        backgroundSize: '110% auto',
        backgroundPosition,
      }}
    />
  );
};

export default IntroBackground;
