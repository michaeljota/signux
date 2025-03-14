import { event } from "../event";
import type { OperatorFn } from "./types";

export function map<T, R>(fn: (value: T) => R): OperatorFn<T, R> {
  return (source) => {
    const mappedEvent = event<R>();
    source.subscribe((value) => mappedEvent(fn(value)));
    return mappedEvent;
  };
}
