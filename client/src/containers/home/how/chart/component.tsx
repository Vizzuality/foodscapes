import { useEffect, useRef } from 'react';

import { useInView } from 'framer-motion';

const HowChart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const inView = useInView(ref, { amount: 0.5 });

  // const { rive, RiveComponent } = useRive({
  //   src: '/images/how/hero.riv',
  //   autoplay: false,
  // });

  useEffect(() => {
    if (inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative flex h-full items-center overflow-hidden">
      <video ref={videoRef} src="/videos/how.mp4" muted loop className="lg:h-5/6" />
      {/* <RiveComponent /> */}
    </div>
  );
};

export default HowChart;
