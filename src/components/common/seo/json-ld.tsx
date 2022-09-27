import {WebPageJsonLd} from 'next-seo';
import {FC} from 'react';

const JsonLd: FC = () => {
  return (
    <WebPageJsonLd
      description={`https://c6a1-113-160-250-135.ap.ngrok.io/seo-img.jpg`}
      id="https://c6a1-113-160-250-135.ap.ngrok.io/"
      lastReviewed="2021-05-26T05:59:02.085Z"
      reviewedBy={{
        type: 'Person',
        name: 'Garmeeh'
      }}
    />
  );
};
export default JsonLd;
