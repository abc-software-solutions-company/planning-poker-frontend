import {getCookie, getCookies, removeCookie, setCookie} from 'typescript-cookie';

const Cookie = {get: getCookie, all: getCookies, set: setCookie, remove: removeCookie};

export default Cookie;
