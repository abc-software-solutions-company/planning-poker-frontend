import {useRouter} from 'next/router';
import {signOut, useSession} from 'next-auth/react';
import React, {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';

export default function DefaultLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  const router = useRouter();
  const {status} = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' && !router.asPath.includes(ROUTES.LOGIN)) {
      signOut({callbackUrl: ROUTES.LOGIN});
    }
    if (status === 'authenticated' && router.asPath.includes(ROUTES.LOGIN)) signOut({callbackUrl: ROUTES.LOGIN});
  }, [status]);

  if (status !== 'authenticated' && !router.asPath.includes(ROUTES.LOGIN)) return null;

  return <>{children}</>;
}
