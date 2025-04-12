import type { EventEmitter } from "./types";

/**
 * @internal
 * Internal stack used to track the currently active reactive context.
 *
 * When `autoTrackCallback` is called, it pushes the current effect or computed function
 * (as an `EventEmitter<void>`) to this stack. Reactive sources can then subscribe to it
 * via `subscribeAutoTracker`.
 *
 * Only the top-most element (via `.at(-1)`) is considered active.
 */
const trackerStack: EventEmitter<void>[] = [];

/**
 * @internal
 * Registers a reactive callback for automatic dependency tracking.
 *
 * Pushes the callback onto the tracker stack, runs it (so it can access
 * reactive values), and then pops it off. Used internally by `computed()` and `effect()`.
 *
 * Any reactive value accessed during the callback execution will automatically
 * subscribe the current tracker (if supported).
 *
 * @param callback The function to track. Must implement `EventEmitter<void>`.
 */
export const autoTrackCallback = (callback: EventEmitter<void>) => {
  trackerStack.push(callback);
  callback();
  trackerStack.pop();
};

/**
 * @internal
 * If a tracker is currently active, subscribes it to the given reactive source.
 *
 * Called by reactive primitives like `state`, `computed`, or `event` whenever
 * they are accessed within a `autoTrackCallback` context.
 *
 * @param subscribe A function that registers a listener (e.g. from `createStateHandler`).
 */
export function subscribeAutoTracker(
  subscribe: (listener: () => void) => void,
) {
  const tracker = trackerStack.at(-1);
  tracker && subscribe(tracker);
}
