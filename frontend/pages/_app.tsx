import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import type { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import CheckSignInStatus from '@components/auth/CheckSignInStatus';
import GlobalModal from '@components/common/GlobalModal';
import GlobalStyle from '@styles/GlobalStyle';
import responsive from '@styles/responsive';

import 'react-toastify/dist/ReactToastify.css';
import '@styles/font.css';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <CheckSignInStatus>
        <GlobalStyle />
        <ThemeProvider theme={responsive}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer limit={3} />
          <GlobalModal />
        </ThemeProvider>
      </CheckSignInStatus>
    </RecoilRoot>
  );
}
