import {useRouter} from 'next/router';
import {DefaultSeo as NextDefaultSeo} from 'next-seo';

import {siteSettings} from '@/configs/site.config';

import JsonLd from './json-ld';

const DefaultSeo: React.FC = () => {
  const router = useRouter();
  const asPath = router.asPath.split('/')[1];

  let subTitle;

  switch (asPath) {
    case '':
      subTitle = '| Lobby';
      break;
    case 'login':
      subTitle = '| Login';
      break;
    case 'room':
      const roomName = router.asPath.split('/')[2].charAt(0).toUpperCase() + router.asPath.split('/')[2].slice(1);
      subTitle = `| ${roomName}`;
  }

  return (
    <>
      <NextDefaultSeo
        title={siteSettings.name}
        titleTemplate={`${siteSettings.name} ${subTitle}`}
        defaultTitle={siteSettings.name}
        description={siteSettings.description}
        openGraph={{
          type: 'website',
          locale: 'en',
          site_name: siteSettings.name,
          description: siteSettings.description,
          images: [{url: '/og-img.jpg', width: 1200, height: 630, alt: 'Seo image'}]
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image'
        }}
        additionalMetaTags={[
          {
            httpEquiv: 'x-ua-compatible',
            content: 'IE=edge'
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1 maximum-scale=1'
          },
          {
            name: 'HandheldFriendly',
            content: 'true'
          },
          {
            name: 'MobileOptimized',
            content: '360'
          },
          {
            name: 'keywords',
            content: 'CMS, CRM, ERP, Microsite, AR, AI, Machine Learning'
          },
          {
            name: 'application-name',
            content: `${siteSettings.name}`
          },
          {
            name: 'theme-color',
            content: '#ffffff'
          },
          {
            name: 'msapplication-TileColor',
            content: '#da532c'
          },
          {
            name: 'msapplication-tap-highlight',
            content: 'no'
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: `${siteSettings.name}`
          },
          {
            name: 'google',
            content: 'notranslate'
          }
        ]}
        additionalLinkTags={[
          {
            rel: 'manifest',
            href: '/manifest.json'
          },
          {
            rel: 'shortcut icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
          },
          {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
          },
          {
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
            href: '/favicon-16x16.png'
          },
          {
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
            href: '/favicon-32x32.png'
          },

          // apple icon
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png'
          },
          {
            rel: 'mask-icon',
            color: '#5bbad5',
            href: '/safari-pinned-tab.svg'
          }
        ]}
      />
      <JsonLd />
    </>
  );
};

export default DefaultSeo;
