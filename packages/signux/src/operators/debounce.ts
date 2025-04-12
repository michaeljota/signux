import { event } from "../event";
import type { OperatorFn } from "./types";

/**
 * Creates an operator that emits values from the source only after a given delay
 * has passed without receiving a new value.
 *
 * Useful to limit how often a stream reacts to rapid sequences of events,
 * such as user input or resize events.
 *
 * @template T The type of values emitted by the source.
 * @param delay Time in milliseconds to wait before emitting the latest value.
 * @returns An operator function that debounces emissions from the source.
 */
export function debounce<T>(delay: number): OperatorFn<T> {
  return (source) => {
    const debouncedEvent = event<T>();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    source.subscribe((value) => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        debouncedEvent(value);
        timeoutId = void 0;
      }, delay);
    });

    return debouncedEvent;
  };
}
