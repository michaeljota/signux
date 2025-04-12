import { subscribeAutoTracker } from "./auto-tracker";
import { event, type Event } from "./event";
import type {
  Subscribable,
  EventEmitter,
  StateGetter,
  PipeOperatorsDefault,
} from "./types";

/**
 * @internal
 * A simple pub-sub system used to notify listeners when a value is emitted.
 *
 * Used internally by reactive primitives to manage subscriptions and notifications.
 *
 * @template T The type of value to emit.
 */
interface ListenersHandler<T> extends Subscribable<T> {
  emit: EventEmitter<T>;
}

/**
 * @internal
 * Creates a new listeners handler for managing subscriptions and emitting values.
 *
 * This is used to implement the pub-sub mechanism inside reactive primitives.
 *
 * @template T The type of values emitted to subscribers.
 * @returns An object with `subscribe(listener)` and `emit(value)` methods.
 */
export function createListenersHandler<T>(): ListenersHandler<T> {
  const listeners: EventEmitter<T>[] = [];

  function subscribe(listener: EventEmitter<T>) {
    listeners.push(listener);

    return () => {
      const updatedListeners = listeners.filter((ref) => ref !== listener);
      listeners.splice(0, listeners.length, ...updatedListeners);
    };
  }

  function emit(value: T) {
    listeners.forEach((listener) => {
      listener(value);
    });
  }

  return { subscribe, emit };
}

/**
 * @internal
 * A function that sets a new value directly.
 *
 * @template T The type of the value.
 */
interface StateSetter<T> {
  (value: T): void;
}

/**
 * @internal
 * A function that updates the current value using an updater function.
 *
 * @template T The type of the value.
 */
interface StateUpdater<T> {
  (updater: (value: T) => T): void;
}

/**
 * @internal
 * The internal structure behind a reactive state, including getter, setter, updater, and subscribe logic.
 *
 * Used to implement both mutable and computed states.
 *
 * @template T The type of the state value.
 */
interface StateHandler<T> extends Subscribable<T> {
  getter: StateGetter<T>;
  update: StateUpdater<T>;
  set: StateSetter<T>;
}

/**
 * @internal
 * Creates the internal state handler for a reactive value.
 *
 * Includes a getter (used in computed tracking), an updater, a setter,
 * and a subscribe method.
 *
 * @template T The type of the state value.
 * @param initialValue Optional initial value.
 * @returns A `StateHandler<T>` with full control over the internal state.
 */
export function createStateHandler<T>(initialValue?: T): StateHandler<T> {
  let currentValue = initialValue as T;
  const { emit, subscribe } = createListenersHandler<T>();

  function set(value: T) {
    update(() => value);
  }

  function update(updater: (value: T) => T) {
    currentValue = updater(currentValue);
    emit(currentValue);
  }

  function getter() {
    subscribeAutoTracker(subscribe);
    return currentValue;
  }

  return { getter, update, set, subscribe };
}

/**
 * @internal
 * Applies a sequence of pipe operators to a reactive source and returns the final `Event<R>`.
 *
 * Used internally by `.pipe(...)` in state, computed, and events.
 *
 * @template T The type of the input values.
 * @template R The type of the resulting values after piping.
 * @param subscribe A subscription function from the source.
 * @param operators A list of reactive operators to apply.
 * @returns A new `Event<R>` resulting from the operator chain.
 */
export function getResultEvent<T, R>(
  subscribe: (this: void, listener: EventEmitter<T>) => void,
  operators: PipeOperatorsDefault,
) {
  const pipeEvent = event<unknown>();
  subscribe(pipeEvent);
  const resultEvent = operators.reduce(
    (acc, op) => op(acc),
    pipeEvent,
  ) as Event<R>;
  return resultEvent;
}
