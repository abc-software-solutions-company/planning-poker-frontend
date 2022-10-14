import {gtag} from './gtag';
import {segment} from './segment';
import {IEvent} from './types';

export const Tracking = {
  page: (url: string) => {
    gtag.page(url);
    segment.page(url);
  },

  event: (params: IEvent) => {
    segment.event(params);
    gtag.event(params);
  }
};
