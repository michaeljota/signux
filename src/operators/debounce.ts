import { event } from "../event";
import type { OperatorFn } from "./types";

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
