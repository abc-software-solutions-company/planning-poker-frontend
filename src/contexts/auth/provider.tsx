import {useRouter} from 'next/router';
import React, {FC, ReactNode, useEffect, useReducer} from 'react';

import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api';
import Cookie from '@/utils/cookie';

import {AuthActions} from '.';
import {Context, DispatchContext, useDispatchAuth, useStateAuth} from './context';
import reducer from './reducer';
import initialState from './state';

interface IProps {
  children: ReactNode;
}
const Authentication: FC<IProps> = ({children}) => {
  const auth = useStateAuth();
  const router = useRouter();
  const asPath = router.asPath;
  const authDispatch = useDispatchAuth();

  useEffect(() => {
    if (!asPath.includes(ROUTES.LOGIN)) {
      Cookie.previousPage.set(asPath);
    }
    const accessToken = Cookie.accessToken.get();
    if (!accessToken) {
      if (!asPath.includes(ROUTES.LOGIN)) router.push(ROUTES.LOGIN);
    } else {
      if (!auth) {
        api.auth.verify().then(res => {
          if (res.status === 200) authDispatch(AuthActions.login(res.data));
          else if (!asPath.includes(ROUTES.LOGIN)) router.push(ROUTES.LOGIN);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!asPath.includes(ROUTES.LOGIN) && !auth) return null;

  return <>{children}</>;
};

const Provider: FC<IProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={state}>
        <Authentication>{children}</Authentication>
      </Context.Provider>
    </DispatchContext.Provider>
  );
};

export default Provider;
