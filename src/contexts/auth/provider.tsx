import {useRouter} from 'next/router';
import {FC, ReactNode, useEffect, useReducer} from 'react';

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
  const {asPath} = useRouter();
  const isLoginPage = asPath.includes(ROUTES.LOGIN);
  const authDispatch = useDispatchAuth();
  const handleSetAuth = async () => {
    const res = await api.auth.verify();
    if (res.status === 200) {
      authDispatch(AuthActions.UPDATE(res.data));
    }
  };
  let showPage = false;
  useEffect(() => {
    if (!asPath.includes(ROUTES.LOGIN)) {
      Cookie.previousPage.set(asPath);
    }
    if (!auth && !isLoginPage) {
      handleSetAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoginPage || auth) showPage = true;
  return <div className={showPage ? '' : 'invisible'}>{children}</div>;
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
