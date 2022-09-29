export const SEGMENT_TRACKING_ID = process.env.NEXT_PUBLIC_SEGMENT_ANALYTICS;

export function pageview(url: string) {
  return url;
}

export function event(action: string) {
  return action;
}
