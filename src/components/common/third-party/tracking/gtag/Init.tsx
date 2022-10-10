import Script from 'next/script';
import {FC} from 'react';

import {gtag} from '.';

const GtagInit: FC = () => {
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.id}`} />
      <Script strategy="afterInteractive" id="ga">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.id}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
};

export default GtagInit;
