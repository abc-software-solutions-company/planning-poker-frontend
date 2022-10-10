import {useRouter} from 'next/router';
import Script from 'next/script';
import {FC, useEffect} from 'react';

import tracking from '.';
import {GA_TRACKING_ID} from './gtag';
import {SEGMENT_TRACKING_ID} from './segment';

const Analytics: FC = () => {
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
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script strategy="afterInteractive" id="ga">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
      {/* Segment */}
      <Script strategy="afterInteractive" id="segment">
        {`
            !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${SEGMENT_TRACKING_ID}";;analytics.SNIPPET_VERSION="4.15.3";
            analytics.load("${SEGMENT_TRACKING_ID}");
            analytics.page();
            }}();
        `}
      </Script>
    </>
  );
};

export default Analytics;
