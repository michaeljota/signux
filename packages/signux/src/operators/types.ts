import type { Event } from "../event";
import type { Subscribable } from "../types";

export type OperatorFn<T, R = T> = (source: Subscribable<T>) => Event<R>;
