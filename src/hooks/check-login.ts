import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth/context';

export function useCheckLogin() {
  const router = useRouter();
  const auth = useStateAuth();
  useEffect(() => {
    const checkLogin = () => {
      if (!auth.userId) {
        router.push(ROUTES.LOGIN);
      }
    };
    checkLogin();
  }, []);
}
