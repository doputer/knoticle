import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ReactElement, ReactNode, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import Authentication from '@components/common/Authentication';
import GlobalModal from '@components/common/GlobalModal';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';

import 'react-toastify/dist/ReactToastify.min.css';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Authentication />
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer limit={3} />
            <GlobalModal />
          </ThemeProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
