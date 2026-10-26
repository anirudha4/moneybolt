type TrackPropertyValue = string | number | boolean | string[];
export type TrackProperties = Record<string, TrackPropertyValue>;

type PendoAgent = {
    track: (eventName: string, properties?: TrackProperties) => void
}

declare global {
    interface Window {
        pendo?: PendoAgent
    }
}

/**
 * Sends a Pendo Track Event. Safe to call when the Pendo agent is not loaded,
 * and never lets a tracking failure break the application flow.
 */
export const trackEvent = (eventName: string, properties: TrackProperties = {}) => {
    try {
        if (typeof window !== 'undefined' && typeof window.pendo?.track === 'function') {
            window.pendo.track(eventName, properties);
        }
    } catch (err) {
        console.error('Pendo track failed', err);
    }
}
