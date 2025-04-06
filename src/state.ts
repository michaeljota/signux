import { createStateHandler, getResultEvent } from "./handlers";
import type {
  Pipeable,
  PipeOperatorsDefault,
  StateGetter,
  Subscribable,
} from "./types";

export interface StateReducer<T, U> {
  (state: T, payload: U): T;
}

export interface State<T>
  extends StateGetter<T>,
    Subscribable<T>,
    Pipeable<T>,
    Pick<StateBuilder<T>, "on"> {}

export interface StateBuilder<T> {
  on<U>(source: Subscribable<U>, reducer: StateReducer<T, U>): StateBuilder<T>;
  create(): State<T>;
}

export function state<T>(): State<T | undefined>;
export function state<T>(initialValue: T): State<T>;
export function state<T>(initialValue?: T): State<T> {
  const { getter, subscribe } = createStateHandler(initialValue);
  return createState(getter, subscribe);
}

function createState<T>(
  getter: StateGetter<T>,
  subscribe: Subscribable<T>["subscribe"],
): State<T> {
  return Object.assign(getter, {
    subscribe,
    pipe<R>(...operators: PipeOperatorsDefault) {
      const resultEvent = getResultEvent<T, R>(subscribe, operators);
      return resultEvent.toState(undefined as R);
    },
    on<U>(source: Subscribable<U>, reducer: StateReducer<T, U>) {
      return createBuilder(getter, subscribe).on(source, reducer);
    },
  });
}

function createBuilder<T>(
  baseGetter: StateGetter<T>,
  baseSubscribe: Subscribable<T>["subscribe"],
): StateBuilder<T> {
  const reactions: [Subscribable<any>, StateReducer<T, any>][] = [];

  const builder: StateBuilder<T> = {
    on<U>(source: Subscribable<U>, reducer: StateReducer<T, U>) {
      reactions.push([source, reducer]);
      return builder;
    },
    create(): State<T> {
      const { getter, subscribe, update, set } = createStateHandler(
        baseGetter(),
      );

      baseSubscribe(set);

      for (const [source, reducer] of reactions) {
        source.subscribe((payload: any) => {
          update((state) => reducer(state, payload));
        });
      }

      return createState(getter, subscribe);
    },
  };

  return builder;
}
