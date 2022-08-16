import isUrlHttp from 'is-url-http';

const PUBLIC_IMAGE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const getImageURL = (url: string): string => {
  let targetUrl = '';
  if (url?.length) {
    targetUrl = isUrlHttp(url) ? url : `${PUBLIC_IMAGE_URL}${url}`;
  }
  return decodeURI(targetUrl);
};
