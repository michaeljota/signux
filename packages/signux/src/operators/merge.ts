import { event, type Subscribable } from "..";
import type { OperatorFn } from "./types";

/**
 * Creates an operator that merges values from the source and another given subscribable
 * into a single stream.
 *
 * Values from both sources are forwarded to the resulting event as they arrive,
 * preserving their original order of emission.
 *
 * @template S The type of values from the source.
 * @template O The type of values from the other subscribable.
 * @param other Another subscribable whose values should be merged with the source.
 * @returns An operator that emits values of type `S | O` from both sources.
 */
export function merge<S, O>(other: Subscribable<O>): OperatorFn<S, S | O> {
  return (source) => {
    const mergedEvent = event<S | O>();
    source.subscribe(mergedEvent);
    other.subscribe(mergedEvent);
    return mergedEvent;
  };
}
