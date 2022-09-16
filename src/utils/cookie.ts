import {getCookie, getCookies, removeCookie, setCookie} from 'typescript-cookie';
import {CookieAttributes} from 'typescript-cookie/dist/types';

const options: CookieAttributes = {expires: 7, sameSite: 'strict', path: '/'};

const generateCookie = (name: string) => {
  return {
    get: () => getCookie(name),
    set: (value: string) => setCookie(name, value, options),
    remove: () => removeCookie(name)
  };
};
const Cookie = {
  all: getCookies,
  accessToken: generateCookie('accessToken'),
  previousPage: generateCookie('previousPage')
};

export default Cookie;
