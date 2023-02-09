import { useEffect, useRef } from 'react';

const GlobeChart = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3;
    }
  }, []);

  return (
    <div className="relative flex h-full items-center">
      <div className="relative aspect-square w-full rounded-full bg-navy-500" />
    </div>
  );
};

export default GlobeChart;
