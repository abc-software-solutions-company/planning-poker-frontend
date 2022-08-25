import '@/vendors/bootstrap/bootstrap.scss';
import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';

import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {SessionProvider} from 'next-auth/react';
import {appWithTranslation} from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import DefaultSeo from '@/components/common/seo/default-seo';
import QueryProvider from '@/contexts/query.provider';

const Noop: React.FC = ({children}: React.PropsWithChildren<any>) => <>{children}</>;

const CustomApp = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;

  return (
    <QueryProvider pageProps={pageProps}>
      <SessionProvider session={session}>
        <DefaultSeo />
        <NextNProgress color="#3D99D3" />
        {/* <GoogleTagManager /> */}
        <Layout pageProps={pageProps}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </SessionProvider>
    </QueryProvider>
  );
};

export default appWithTranslation(CustomApp);
