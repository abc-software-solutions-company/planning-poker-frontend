import {WebPageJsonLd} from 'next-seo';
import {FC} from 'react';

const JsonLd: FC = () => {
  return (
    <WebPageJsonLd
      description={process.env.NEXT_PUBLIC_SITE_URL || 'https://voteuserstory.com' + '/seo-img/jpg'}
      id={process.env.NEXT_PUBLIC_SITE_URL || 'https://voteuserstory.com'}
    />
  );
};
export default JsonLd;
