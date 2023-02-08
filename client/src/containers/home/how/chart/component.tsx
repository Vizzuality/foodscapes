import { useEffect, useRef } from 'react';

const HowChart = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3;
    }
  }, []);

  return (
    <div className="relative flex h-full items-center overflow-hidden">
      <video className="scale-150" ref={videoRef} src="/videos/plant.m4v" muted autoPlay />
    </div>
  );
};

export default HowChart;
