import { type ComputedState } from "./computed";
import { createListenersHandler, getResultEvent } from "./handlers";
import { state } from "./state";
import type {
  EventEmitter,
  Pipeable,
  PipeOperatorsDefault,
  Subscribable,
} from "./types";

export interface Event<T = void>
  extends EventEmitter<T>,
    Subscribable<T>,
    Pipeable<T> {
  toState: ToState<T>;
}

export interface NoEmitterEvent<T> extends Subscribable<T>, Pipeable<T> {
  toState: ToState<T>;
}

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

interface ToState<T> {
  (initialValue: T): ComputedState<T>;
  (): ComputedState<T | undefined>;
}
