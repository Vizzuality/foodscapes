import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import Wrapper from 'containers/wrapper';

const Outro = () => {
  return (
    <section className="relative z-20">
      <Wrapper>
        <motion.div className="grid min-h-screen grid-cols-12 items-center gap-6 lg:pt-24">
          <div className="col-span-12 space-y-20 lg:col-span-6 lg:col-start-4">
            <div className="space-y-5 text-center text-white">
              <p className="font-semibold">
                To guide that action, we can take inspiration from the nature-based solutions that
                would work in the Gran Chaco region and extrapolate these to similar foodscapes
                worldwide.
              </p>
              <p className="font-semibold">
                Extrapolating possible nature-based solutions should be done with care, as unique
                contexts will influence the viability and potential of solutions. However, the
                example of Soy in Gran Chaco offers a place to start and explore further.
              </p>
            </div>

            <div className="flex justify-center">
              <Link href="/explore-map">
                <button className="relative space-y-2.5">
                  <Image
                    width={194}
                    height={99}
                    src="/images/outro/map.svg"
                    alt="Explore map image"
                  />

                  <p className="text-xxs font-bold uppercase text-white">Explore map</p>

                  <motion.div
                    className="absolute top-1/2 left-1/2 aspect-square w-full rounded-full bg-white/25"
                    initial={{ scale: 0, x: '-50%', y: '-60%', opacity: 0 }}
                    animate={{
                      scale: [0, 1.5],
                      x: ['-50%', '-50%'],
                      y: ['-60%', '-60%'],
                      opacity: [0, 0.5, 1, 0],
                    }}
                    transition={{
                      duration: 0.75,
                      ease: 'linear',
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default Outro;
