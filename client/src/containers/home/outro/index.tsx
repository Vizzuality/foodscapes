import Image from 'next/image';
import Link from 'next/link';

import cn from 'lib/classnames';

import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';

import ARROW_RIGHT_SVG from 'svgs/ui/arrow-right.svg?sprite';

const Outro = () => {
  return (
    <div className="relative z-20 flex min-h-screen flex-col justify-center bg-white">
      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 flex flex-col xl:col-start-2">
            <div className="flex h-full grow flex-col">
              <Link
                href="/stories/argentina-gran-chaco"
                className="relative flex h-full grow flex-col"
              >
                <div
                  className={cn({
                    'group relative flex h-full grow flex-col justify-between space-y-8': true,
                    'z-0 after:absolute after:top-0 after:left-0 after:-mt-6 after:-ml-6 after:h-[calc(100%_+_theme(space.12))] after:w-[calc(100%_+_theme(space.12))] after:bg-yellow-700 after:opacity-0 after:transition-opacity hover:after:opacity-100':
                      true,
                  })}
                >
                  <div className="relative z-10 flex h-full grow flex-col justify-between space-y-8">
                    <header className="space-y-8">
                      <h2 className="font-display text-4xl">Continue learning.</h2>
                      <p>
                        See soy production in action and how its foodscapes interact within the
                        specific boundary of Argentina Gran Chaco. Discover the risks that apply to
                        a real area and how nature-based solutions can help to ensure the integrity
                        of the ecosystem.
                      </p>
                    </header>

                    <div className="flex items-end justify-between">
                      <Image
                        width={81}
                        height={131}
                        src="/images/outro/plant.png"
                        alt="Grand chaco plant"
                      />
                      <Icon
                        icon={ARROW_RIGHT_SVG}
                        className="h-4 w-4 group-hover:animate-bounce-horizontal"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-span-4 col-start-8 flex flex-col">
            <div className="flex h-full grow flex-col">
              <Link href="/explore-map" className="relative flex h-full grow flex-col">
                <div
                  className={cn({
                    'group relative flex h-full grow flex-col': true,
                    'z-0 after:absolute after:top-0 after:left-0 after:-mt-6 after:-ml-6 after:h-[calc(100%_+_theme(space.12))] after:w-[calc(100%_+_theme(space.12))] after:bg-navy-500 hover:after:bg-navy-500/90':
                      true,
                  })}
                >
                  <div className="relative z-10 flex h-full grow flex-col justify-between space-y-8">
                    <header className="space-y-8">
                      <h2 className="font-display text-4xl text-white">Explore map.</h2>
                      <p className="text-white">
                        Have a look at the 83 foodscapes in the map tool. Play with the different
                        filters to understand all their risks and opportunities, and learn about
                        specific case studies.
                      </p>
                    </header>

                    <div className="flex items-end justify-between">
                      <Image
                        width={194}
                        height={99}
                        src="/images/outro/map.svg"
                        alt="Explore map image"
                      />
                      <Icon
                        icon={ARROW_RIGHT_SVG}
                        className="h-4 w-4 text-white group-hover:animate-bounce-horizontal"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Outro;
