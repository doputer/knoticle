import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import CheckSignInStatus from '@components/auth/CheckSignInStatus';
import GlobalModal from '@components/common/GlobalModal';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';

import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CheckSignInStatus>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer limit={3} />
            <GlobalModal />
          </ThemeProvider>
        </CheckSignInStatus>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
