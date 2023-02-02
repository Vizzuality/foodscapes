import { useCallback, useEffect, useState } from 'react';

import { MapProvider } from 'react-map-gl';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { GAPage } from 'lib/analytics/ga';

import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import Layout from 'layouts';

import ThirdParty from 'containers/third-party';

import { MediaContextProvider } from 'components/media-query';

import 'styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
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
            <MapProvider>
              {/* Layout */}
              <Layout>
                <Component {...pageProps} />
                <ThirdParty />
              </Layout>
            </MapProvider>
          </MediaContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default MyApp;
