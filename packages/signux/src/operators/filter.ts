import { event } from "../event";
import type { OperatorFn } from "./types";

/**
 * Creates an operator that only emits values from the source
 * if they satisfy the given predicate function.
 *
 * @template T The type of values emitted by the source.
 * @param predicate A function that returns `true` for values to be emitted.
 * @returns An operator function that filters emissions from the source.
 */
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
