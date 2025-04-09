import { event, type Subscribable } from "..";
import type { OperatorFn } from "./types";

export function merge<S, O>(other: Subscribable<O>): OperatorFn<S, S | O> {
  return (source) => {
    const mergedEvent = event<S | O>();
    source.subscribe(mergedEvent);
    other.subscribe(mergedEvent);
    return mergedEvent;
  };
}
