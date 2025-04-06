import { autoTrackCallback } from "./auto-tracker";
import { createStateHandler, getResultEvent } from "./handlers";
import type { Pipeable, PipeOperatorsDefault, StateGetter, Subscribable } from "./types";

export interface ComputedState<T>
  extends StateGetter<T>,
    Subscribable<T>,
    Pipeable<T> {}

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
