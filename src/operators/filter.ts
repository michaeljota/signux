import { event } from "../event";
import type { OperatorFn } from "./types";

export function filter<T>(predicate: (value: T) => boolean): OperatorFn<T> {
  return (source) => {
    const filteredEvent = event<T>();
    source.subscribe((value) => {
      if (predicate(value)) {
        filteredEvent(value);
      }
    });
    return filteredEvent;
  };
}
