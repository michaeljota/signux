import type { Event } from "../event";
import type { Subscribable } from "../types";

/**
 * Represents a reactive operator function.
 *
 * An operator receives a subscribable source of type `T` and returns
 * a new `Event<R>` that emits transformed, filtered, or otherwise derived values.
 *
 * This type is used in `.pipe(...)` to compose reactive logic in a functional way.
 *
 * @template T The type of values emitted by the source.
 * @template R The type of values emitted by the resulting event (defaults to `T`).
 */
export type OperatorFn<T, R = T> = (source: Subscribable<T>) => Event<R>;

export type ThrottleMode = "lead" | "trail";
