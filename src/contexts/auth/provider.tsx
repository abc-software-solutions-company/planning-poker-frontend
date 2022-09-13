import {useRouter} from 'next/router';
import React, {FC, ReactNode, useEffect, useReducer} from 'react';
import {getCookie} from 'typescript-cookie';

import {ROUTES} from '@/configs/routes.config';
import {getUser} from '@/data/client/user.client';
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
  const authDispatch = useDispatchAuth();
  useEffect(() => {
    if (router.asPath.includes(ROUTES.ROOM) && !auth) {
      Cookie.set('_room', router.asPath);
    }

    const userIdCookie = getCookie('_userId');
    if (!userIdCookie) {
      authDispatch(AuthActions.login(false));
    } else {
      if (auth === null) {
        getUser({id: userIdCookie}).then(res => {
          if (res.status === 200) authDispatch(AuthActions.login(res.data));
          else authDispatch(AuthActions.login(false));
        });
      }
    }
    if (!router.asPath.includes(ROUTES.LOGIN) && auth === false) router.push(ROUTES.LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  if (!router.asPath.includes(ROUTES.LOGIN) && (auth === null || auth === false)) return null;
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
