import { event } from "../event";
import type { OperatorFn } from "./types";

export function debounce<T>(delay: number): OperatorFn<T> {
  return (source) => {
    const debouncedEvent = event<T>();
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    source.subscribe((value) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        debouncedEvent(value);
        timeoutId = null;
      }, delay);
    });

    return debouncedEvent;
  };
}
