import type { EventEmitter } from "./types";

const trackerStack: EventEmitter<void>[] = [];

export const autoTrackCallback = (callback: EventEmitter<void>) => {
  trackerStack.push(callback);
  callback();
  trackerStack.pop();
};

export function subscribeAutoTracker(
  subscribe: (listener: () => void) => void,
) {
  const tracker = trackerStack.at(-1);
  tracker && subscribe(tracker);
}
