import { subscribeAutoTracker } from "./auto-tracker";
import { event, type Event } from "./event";
import type {
  Subscribable,
  EventEmitter,
  StateGetter,
  PipeOperatorsDefault,
} from "./types";

interface ListenersHandler<T> extends Subscribable<T> {
  emit: EventEmitter<T>;
}

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

interface StateSetter<T> {
  (value: T): void;
}

interface StateUpdater<T> {
  (updater: (value: T) => T): void;
}

interface StateHandler<T> extends Subscribable<T> {
  getter: StateGetter<T>;
  update: StateUpdater<T>;
  set: StateSetter<T>;
}

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
