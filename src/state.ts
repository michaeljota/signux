import { computed } from "./computed";
import { event, type Event } from "./event";
import { createStateHandler, getResultEvent } from "./handlers";
import type {
  EventEmitter,
  Pipeable,
  PipeOperatorsDefault,
  StateGetter,
  Subscribable,
} from "./types";

export interface StateReducer<T, U> {
  (state: T, payload: U): T;
}

export interface State<T> extends StateGetter<T>, Subscribable<T>, Pipeable<T> {
  on<U>(subscribable: Subscribable<U>, reducer: StateReducer<T, U>): State<T>;
}

export function state<T>(): State<T | undefined>;
export function state<T>(initialValue: T): State<T>;
export function state<T>(initialValue?: T): State<T> {
  const { getter, subscribe, update } = createStateHandler(initialValue);

  function pipe<R>(...operators: PipeOperatorsDefault) {
    const resultEvent = getResultEvent<T, R>(subscribe, operators);
    const resultState = resultEvent.toState(undefined as R);
    return computed(() => resultState());
  }

  function on<U>(subscribable: Subscribable<U>, reducer: StateReducer<T, U>) {
    subscribable.subscribe((payload) => {
      update((value) => reducer(value, payload));
    });
    return Object.assign(getter, { subscribe, on, pipe });
  }

  return Object.assign(getter, { subscribe, on, pipe });
}