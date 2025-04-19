import { event } from "../event";
import type { OperatorFn } from "./types";

/**
 * Creates an operator that emits only the last value from a burst of events,
 * scheduling the emission at the end of the current microtask.
 *
 * Useful to reduce redundant emissions within the same execution frame,
 * without introducing delays noticeable to the user.
 *
 * For example, if multiple updates happen within a single task or animation frame,
 * only the last one will be emitted.
 *
 * @template T The type of values emitted by the source.
 * @returns An operator function that micro-debounces emissions from the source.
 */
export function microDebounce<T>(): OperatorFn<T> {
  return (source) => {
    const out = event<T>();
    let queued = false;
    let latestValue: T;
    source.subscribe((value) => {
      latestValue = value;
      if (queued) {
        return;
      }
      queued = true;
      queueMicrotask(() => {
        queued = false;
        out(latestValue);
      });
    });

    return out;
  };
}
