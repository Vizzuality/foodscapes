import Image from 'next/image';

import Wrapper from 'containers/wrapper';

const About = () => {
  return (
    <>
      <Wrapper>
        <div className="space-y-10 py-24 lg:py-48">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 xl:col-span-5 xl:col-start-2">
              <h2 className="font-display text-5xl">About Foodscapes.</h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 xl:col-span-5 xl:col-start-2">
              <div className="flex flex-col justify-center space-y-6">
                <p className="font-light">
                  The Nature Conservancy is a global environmental nonprofit working to create a
                  world where people and nature can thrive. Founded in the U.S. through grassroots
                  action in 1951, The Nature Conservancy (TNC) has grown to become one of the most
                  effective and wide-reaching environmental organizations in the world. Thanks to
                  more than a million members and the dedicated efforts of our diverse staff and
                  over 400 scientists, we impact conservation in 76 countries and territories: 37 by
                  direct conservation impact and 39 through partners.
                </p>
                <p className="font-light">
                  The work featured here comes from our report,{' '}
                  <u>
                    <a
                      href="https://www.nature.org/content/dam/tnc/nature/en/documents/TNC_FoodscapesReport.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Foodscapes: Toward Food System Transition{' '}
                    </a>
                  </u>
                  — a collaboration among TNC, the International Institute for Applied Systems
                  Analysis (IIASA), and SYSTEMIQ.
                </p>

                <div className="flex space-x-6">
                  <div>
                    <Image
                      width={139}
                      height={57}
                      src="/images/about/TNC_logo.svg"
                      alt="TNC logo"
                      className="h-auto"
                    />
                  </div>
                  <div>
                    <Image
                      width={139}
                      height={63}
                      src="/images/about/iiasa.svg"
                      alt="IIASA logo"
                      className="h-auto"
                    />
                  </div>
                  <div>
                    <Image
                      width={139}
                      height={40}
                      src="/images/about/SYSTEMIQ_Logo.png"
                      alt="Systemiq logo"
                      className="h-auto"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-6 pt-4">
                  <p className="text-sm font-light">Designed and developed by:</p>
                  <a href="https://www.vizzuality.com/" target="_blank" rel="noopener noreferrer">
                    <Image
                      width={80}
                      height={25}
                      src="/images/about/vizz_logo.svg"
                      alt="Vizzuality logo"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-5 col-start-8">
              <div className="flex flex-col items-end">
                <video src="/videos/about.mp4" autoPlay loop muted className="aspect-{1920/822}" />
              </div>
              <p className="pt-2 text-xxs font-light">
                © {new Date().getFullYear()} The Nature Conservancy
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default About;
