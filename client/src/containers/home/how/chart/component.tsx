import { useRive } from '@rive-app/react-canvas';

const HowChart = () => {
  const { RiveComponent } = useRive({
    src: '/images/how/hero.riv',
    autoplay: true,
  });

  return (
    <div className="relative flex h-full items-center overflow-hidden">
      <RiveComponent />
    </div>
  );
};

export default HowChart;
