import { useEffect, useRef } from 'react';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const HowChart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const inView = useInView(ref, { amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });

  const x = useTransform(scrollYProgress, (v) => {
    return v * -100;
  });

  const scale = useTransform(scrollYProgress, (v) => {
    return (1 - v) * 0.25 + 0.75;
  });

  useEffect(() => {
    if (inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="relative flex h-full items-center overflow-hidden"
      style={{
        x,
        scale,
      }}
    >
      <video ref={videoRef} src="/videos/how.mp4" muted loop className="lg:h-5/6" />
      {/* <RiveComponent /> */}
    </motion.div>
  );
};

export default HowChart;
