import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';

import { MapProvider } from 'react-map-gl';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { GAPage } from 'lib/analytics/ga';

import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { NextPage } from 'next';
import { RecoilRoot } from 'recoil';

import Layout from 'layouts/app';

import ThirdParty from 'containers/third-party';

import { MediaContextProvider } from 'components/media-query';
import { TooltipProvider } from 'components/ui/tooltip';

import 'styles/globals.css';
import 'styles/mapbox.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  const router = useRouter();

  // Never ever instantiate the client outside a component, hook or callback as it can leak data
  // between users
  const [queryClient] = useState(() => new QueryClient());

  const handleRouteChangeCompleted = useCallback((url: string) => {
    GAPage(url);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChangeCompleted);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeCompleted);
    };
  }, [router.events, handleRouteChangeCompleted]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {/* @ts-ignore: https://github.com/artsy/fresnel/issues/281 */}
          <MediaContextProvider>
            <TooltipProvider delayDuration={750}>
              <MapProvider>
                {/* Layout */}
                {getLayout(<Component {...pageProps} />)}
                <ThirdParty />
              </MapProvider>
            </TooltipProvider>
          </MediaContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default MyApp;
