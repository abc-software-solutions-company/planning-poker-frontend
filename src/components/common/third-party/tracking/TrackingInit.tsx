import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

import {Tracking} from '.';
import GtagInit from './gtag/Init';
import SegmentInit from './segment/Init';

const TrackingInit: FC = () => {
  const router = useRouter();
  useEffect(() => {
    const pageTracking = () => {
      Tracking.page(window.location.pathname);
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

export default TrackingInit;
