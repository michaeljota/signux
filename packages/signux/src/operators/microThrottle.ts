import { event } from "../event";
import type { OperatorFn } from "./types";

/**
 * Creates an operator that emits the first value from a burst of events,
 * suppressing the rest until the next microtask.
 *
 * Useful to prevent flooding a stream with multiple emissions in the same
 * execution frame, while still reacting to the first trigger immediately.
 *
 * @template T The type of values emitted by the source.
 * @returns An operator function that micro-throttles emissions from the source.
 */
export function microThrottle<T>(): OperatorFn<T> {
  return (source) => {
    const out = event<T>();
    let queued = false;

    source.subscribe((payload) => {
      if (queued) {
        return;
      }
      out(payload);
      queued = true;
      queueMicrotask(() => {
        queued = false;
      });
    });

    return out;
  };
}
