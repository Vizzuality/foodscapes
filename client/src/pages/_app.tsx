import { useCallback, useEffect, useState } from 'react';

import { MapProvider } from 'react-map-gl';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { GAPage } from 'lib/analytics/ga';

import store from 'store';

import { Domine, Public_Sans } from '@next/font/google';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

import ThirdParty from 'containers/third-party';

import { MediaContextProvider } from 'components/media-query';

import 'styles/globals.css';

const domine = Domine({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-domine',
});

const publicSans = Public_Sans({
  weight: ['300', '400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-public-sans',
});

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
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {/* @ts-ignore: https://github.com/artsy/fresnel/issues/281 */}
          <MediaContextProvider>
            <MapProvider>
              <ThirdParty />
              <main className={`${domine.variable} ${publicSans.variable} font-sans`}>
                <Component {...pageProps} />
              </main>
            </MapProvider>
          </MediaContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default MyApp;
