import { event } from "../event";
import type { OperatorFn } from "./types";

/**
 * Creates an operator that transforms each value from the source
 * using the provided mapping function.
 *
 * @template T The type of values emitted by the source.
 * @template R The type of values emitted after transformation.
 * @param fn A function that receives a value `T` and returns a new value `R`.
 * @returns An operator function that maps source values to new ones.
 */
export function map<T, R>(fn: (value: T) => R): OperatorFn<T, R> {
  return (source) => {
    const mappedEvent = event<R>();
    source.subscribe((value) => mappedEvent(fn(value)));
    return mappedEvent;
  };
}
