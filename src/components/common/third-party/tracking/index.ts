import * as gtag from './gtag';
import * as segment from './segment';

const tracking = {
  page(url: string) {
    gtag.pageview(url);
    segment.pageview(url);
  },
  event(params: segment.IEvent) {
    segment.event(params);
  }
};

export default tracking;
