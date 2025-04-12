import { autoTrackCallback } from "./auto-tracker";
import { createStateHandler, getResultEvent } from "./handlers";
import type {
  Pipeable,
  PipeOperatorsDefault,
  StateGetter,
  Subscribable,
} from "./types";

/**
 * Represents a read-only reactive state derived from other reactive sources.
 * It can be read, subscribed to, and composed through `.pipe(...)`.
 *
 * The value is computed using a pure `transform` function, which is automatically
 * re-executed whenever any of its reactive dependencies change.
 *
 * Unlike regular state, a computed state cannot be directly updated — its value
 * is always the result of the provided computation.
 *
 * @template T The type of the computed value.
 */
export interface ComputedState<T>
  extends StateGetter<T>,
    Subscribable<T>,
    Pipeable<T> {}

/**
 * Creates a read-only reactive state derived from other reactive values.
 *
 * The provided `transform` function is executed immediately to compute the initial value,
 * and will re-run automatically whenever any of its reactive dependencies change.
 *
 * The returned state is passive: it cannot be directly updated, and its value is
 * always the result of the `transform` function.
 *
 * @template T The type of the computed value.
 * @param transform A pure function that derives a value from other reactive sources.
 * @returns A reactive `ComputedState<T>`.
 */
export function computed<T>(transform: () => T): ComputedState<T> {
  const { getter, subscribe, set } = createStateHandler<T>();

  autoTrackCallback(() => set(transform()));

  function pipe<R>(...operators: PipeOperatorsDefault) {
    const resultEvent = getResultEvent<T, R>(subscribe, operators);
    const resultState = resultEvent.toState(undefined as R);
    return computed(() => resultState());
  }

  return Object.assign(getter, { subscribe, pipe });
}
