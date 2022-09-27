import {merge} from 'lodash-es';

const organizationDefault = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  founder: 'Khanh Mai',
  logo: "'https://abcsoftwarecompany.com/android-chrome-512x512.png",
  url: 'https://abcsoftwarecompany.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Viet Nam',
    addressRegion: 'Nha Trang',
    postalCode: '650000'
  }
};

const websiteDefault = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  datePublished: 'September 2022',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  sameAs: [
    'https://www.facebook.com/abcsoftwaresolutionscompany',
    'https://www.linkedin.com/company/abc-software-solutions-company'
  ]
};

export const siteSettings = {
  name: 'Planing Poker',
  description: 'Planning Poker is an application for many participants to vote on user stories',
  author: {
    name: 'ABC Software Solutions',
    websiteUrl: 'https://www.abcsoftwarecompany.com'
  },
  logo: {
    url: process.env.NEXT_PUBLIC_SITE_URL + '/og-img.jpg',
    alt: 'Planning Poker',
    width: 512,
    height: 512
  },
  defaultLanguage: 'en',
  facebookUrl: 'https://www.facebook.com/abcsoftwaresolutionscompany',
  linkedInUrl: 'https://www.linkedin.com/company/abc-software-solutions-company',
  contact: {
    email: 'hello@abcsoftwarecompany.com'
  },
  schemaJsonLd: {
    organization: merge(organizationDefault, {
      name: 'ABC Software Solution'
    }),
    website: merge(websiteDefault, {
      name: 'Planning Poker'
    })
  }
};
