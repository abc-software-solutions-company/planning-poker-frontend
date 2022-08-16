import {IAnyObj} from '@/types';

export function objToQueryString(obj: IAnyObj): string {
  const str: string[] = [];

  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}
