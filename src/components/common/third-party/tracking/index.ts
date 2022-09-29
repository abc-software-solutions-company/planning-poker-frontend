import * as gtag from './gtag';
import * as segment from './segment';

export function page(url: string) {
  gtag.pageview(url);
  segment.pageview(url);
}
