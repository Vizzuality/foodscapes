import Image from 'next/image';

import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';

import TNC_SVG from 'svgs/about/TNC_logo.svg?sprite';

const About = () => {
  return (
    <>
      <Wrapper>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5 xl:col-span-4 xl:col-start-2">
            <div className="flex h-small-screen flex-col justify-center space-y-10 ">
              <h2 className="font-display text-5xl">About Foodscapes.</h2>

              <div className="space-y-4">
                <p className="font-light">
                  [Placeholder text] Foodscapes is a Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <p className="font-light">
                  The project involves collaboration with the following partners:
                </p>

                <div className="flex justify-between">
                  <Icon icon={TNC_SVG} className="h-10 w-36" />
                  <Icon icon={TNC_SVG} className="h-10 w-36" />
                </div>

                <p className="font-light">Designed and developed by:</p>
                <Icon icon={TNC_SVG} className="h-10 w-36" />
              </div>
            </div>
          </div>

          <div className="col-span-5 col-start-7 h-small-screen">
            <div className="flex h-full flex-col items-center justify-center">
              <Image
                width={456}
                height={280}
                src="/images/about/about.jpg"
                alt="About field image"
              />
            </div>
          </div>
        </div>
      </Wrapper>

      {/* <div className="sticky top-0 left-0 z-0 h-small-screen w-full">

      </div> */}
    </>
  );
};

export default About;
