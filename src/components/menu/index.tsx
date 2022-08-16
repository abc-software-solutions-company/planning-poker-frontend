import {useRouter} from 'next/router';
import React, {useEffect} from 'react';

import {useAppContext, useAppDispatchContext} from '@/contexts/app.context';

import MenuDesktop from './desktop';
import MenuMobile from './mobile';

const MainMenu: React.FC = () => {
  const router = useRouter();
  const appContext = useAppContext();
  const dispatch = useAppDispatchContext();

  const toggleMenu = (state: boolean) => {
    dispatch({type: 'TOGGLE_MAINMENU', payload: {menuVisible: state}});
  };

  useEffect(() => {
    document.body.classList.toggle('no-scroll', appContext.menuVisible);
    return () => {
      document.body.classList.toggle('no-scroll', false);
    };
  }, [appContext.menuVisible]);

  useEffect(() => {
    const handleRouteChange = () => {
      toggleMenu(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <>
      <MenuDesktop hamburgerActive={appContext.menuVisible} onClick={() => toggleMenu(!appContext.menuVisible)} />
      <MenuMobile visible={appContext.menuVisible} />
    </>
  );
};

export default MainMenu;
