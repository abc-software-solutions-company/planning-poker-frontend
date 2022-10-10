export const SEGMENT_TRACKING_ID = process.env.NEXT_PUBLIC_SEGMENT_ANALYTICS;

export function pageview(url: string) {
  if (typeof window === undefined) return;
  return (window as any).analytics.page(url);
}
export interface IEvent {
  name: string;
  properties?: any;
}

export function event({name, properties}: IEvent) {
  if (typeof window === undefined) return;
  return (window as any).analytics.track(name, properties);
}
