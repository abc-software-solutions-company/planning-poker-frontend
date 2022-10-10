// https://developers.google.com/analytics/devguides/collection/gtagjs/pages

import {IEvent} from '../types';

declare global {
  interface Window {
    gtag: any;
  }
}

export const gtag = {
  id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  page(url: string) {
    if (this.id && typeof window === undefined) return;
    window.gtag('config', this.id, {page_path: url});
  },
  event({name, properties}: IEvent) {
    if (this.id && typeof window === undefined) return;
    window.gtag('event', name, properties);
  }
};
