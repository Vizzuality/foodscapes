import { stepAtom } from 'store/home';

import { useRecoilValue } from 'recoil';

import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

const ScrollButton = () => {
  const step = useRecoilValue(stepAtom);

  return (
    <button
      className="absolute bottom-20 mx-auto mb-5 flex flex-col items-center space-y-4 rounded-full xl:left-20"
      onClick={() => {
        const el = document.querySelector(`#scroll-${step + 1}`);
        el?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <Icon icon={ARROW_DOWN_SVG} className="h-4 w-4 animate-bounce" />
    </button>
  );
};

export default ScrollButton;
