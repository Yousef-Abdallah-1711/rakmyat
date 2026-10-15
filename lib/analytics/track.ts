import type { AnalyticsEventName, AnalyticsEventProperties } from './events'

type AnalyticsVendor = {
  track: (event: AnalyticsEventName, properties: object) => void
}

declare global {
  interface Window {
    __rakmyatAnalytics?: AnalyticsVendor
  }
}

export function track<EventName extends AnalyticsEventName>(
  event: EventName,
  properties: AnalyticsEventProperties[EventName],
) {
  if (typeof window === 'undefined') return

  window.__rakmyatAnalytics?.track(event, properties)
}
