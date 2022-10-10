//https://segment.com/docs/connections/
import {IEvent} from '../types';

declare global {
  interface Window {
    analytics: any;
  }
}

export const segment = {
  id: process.env.NEXT_PUBLIC_SEGMENT_ANALYTICS,
  page(url: string) {
    if (!this.id && typeof window === undefined) return;
    return window.analytics.page(url);
  },
  event({name, properties}: IEvent) {
    if (!this.id && typeof window === undefined) return;
    return window.analytics.track(name, properties);
  }
};
