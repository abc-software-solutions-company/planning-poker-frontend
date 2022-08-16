const withPlugins = require('next-compose-plugins');
const {i18n} = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'abc-strapi-dev.s3.ap-southeast-1.amazonaws.com',
      'strapi-dev-alb-2059981737.ap-southeast-1.elb.amazonaws.com',
      'abc-cms-1740798364.ap-southeast-1.elb.amazonaws.com',
      'strapiv4cms.abcsoftwarecompany.com',
      'strapiv4cms.stage.abcsoftwarecompany.com',
      'abc-cms-stage.s3.ap-southeast-1.amazonaws.com',
      'abc-cms-production.s3.ap-southeast-1.amazonaws.com'
    ]
  },
  output: 'standalone'
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
