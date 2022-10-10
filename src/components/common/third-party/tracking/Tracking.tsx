import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

import {tracking} from '.';
import GtagInit from './gtag/Init';
import SegmentInit from './segment/Init';

const Tracking: FC = () => {
  const router = useRouter();
  useEffect(() => {
    const pageTracking = () => {
      tracking.page(window.location.pathname);
    };
    router.events.on('routeChangeComplete', pageTracking);
    return () => {
      router.events.off('routeChangeComplete', pageTracking);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);
  return (
    <>
      <GtagInit />
      <SegmentInit />
    </>
  );
};

export default Tracking;
