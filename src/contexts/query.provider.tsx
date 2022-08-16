import type {AppProps} from 'next/app';
import React from 'react';
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

interface QueryProviderProps {
  pageProps: AppProps['pageProps'];
}

export default function QueryProvider({pageProps, children}: React.PropsWithChildren<QueryProviderProps>) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
