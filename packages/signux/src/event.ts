import { type ComputedState } from "./computed";
import { createListenersHandler, getResultEvent } from "./handlers";
import { state } from "./state";
import type {
  EventEmitter,
  Pipeable,
  PipeOperatorsDefault,
  Subscribable,
} from "./types";

/**
 * A reactive event stream that can emit values, be subscribed to,
 * and composed through `.pipe(...)`. It can also be converted into
 * a state via `.toState(...)`.
 *
 * @template T The type of the values emitted by the event.
 */
export interface Event<T = void> extends EventEmitter<T>, NoEmitterEvent<T> {}

/**
 * A read-only version of an event that cannot emit values, but can still be
 * subscribed to, piped, and converted into a state.
 *
 * @template T The type of the values emitted by the event.
 */
export interface NoEmitterEvent<T> extends Subscribable<T>, Pipeable<T> {
  /**
   * Creates a computed state that reacts to values emitted by this event.
   *
   * @param initialValue Optional initial value for the state.
   * @returns A `ComputedState<T>` that updates every time the event emits a value.
   */
  toState: ToState<T>;
}

/**
 * Creates a new reactive event stream. The returned event can emit values via `emit(...)`,
 * be subscribed to, transformed with `.pipe(...)`, or turned into reactive state via `.toState(...)`.
 *
 * @template T The type of the values emitted by the event.
 * @returns A new `Event<T>`.
 */
export function event<T = void>(): Event<T> {
  const { emit, subscribe } = createListenersHandler<T>();

  const toState = (initialValue?: T) =>
    state(initialValue)
      .on({ subscribe }, (_, v) => v)
      .create();

  function pipe<R>(...operators: PipeOperatorsDefault): Event<R> {
    return getResultEvent<T, R>(subscribe, operators);
  }

  return Object.assign(emit, { subscribe, toState, pipe }) as Event<T>;
}

/**
 * A function that transforms an event into a reactive state.
 *
 * If an `initialValue` is provided, the resulting state starts with that value;
 * otherwise, it starts as `undefined`.
 *
 * @template T The type of the values emitted by the event.
 */
interface ToState<T> {
  (initialValue: T): ComputedState<T>;
  (): ComputedState<T | undefined>;
}
