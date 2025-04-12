import { createStateHandler, getResultEvent } from "./handlers";
import type {
  Pipeable,
  PipeOperatorsDefault,
  StateGetter,
  Subscribable,
} from "./types";

/**
 * A function that receives the current state and a payload, and returns a new state.
 *
 * @template T The type of the current state.
 * @template U The type of the payload.
 */
export interface StateReducer<T, U> {
  (state: T, payload: U): T;
}

/**
 * Represents a reactive state that holds a value, can be read and subscribed to,
 * and allows data flow composition through `.pipe(...)`.
 *
 * To add reactive behavior, you can use the `.on(...)` method, which returns
 * a builder that lets you define how the state should respond to values from other sources.
 *
 * @template T The type of the value stored in the state.
 */
export interface State<T>
  extends StateGetter<T>,
    Subscribable<T>,
    Pipeable<T>,
    Pick<StateBuilder<T>, "on"> {}

/**
 * A builder interface for configuring and creating a reactive state with side effects.
 *
 * @template T The type of the value stored in the state.
 */
export interface StateBuilder<T> {
  /**
   * Adds a reducer that reacts to emissions from the given source.
   *
   * @template U The type of the payload emitted by the source.
   * @param source A subscribable that emits values.
   * @param reducer A reducer function that updates the state based on the emitted value.
   * @returns The same builder instance, allowing method chaining.
   */
  on<U>(source: Subscribable<U>, reducer: StateReducer<T, U>): StateBuilder<T>;

  /**
   * Finalizes the builder and returns a `State<T>` with all configured side effects attached.
   *
   * @returns The reactive state.
   */
  create(): State<T>;
}

/**
 * Creates a reactive state container. Can be initialized with an initial value or left undefined.
 * The returned state is initially constant and can be made reactive by chaining `.on(...)` and `.create()`.
 *
 * @template T The type of the value.
 * @param initialValue Optional initial value for the state.
 *
 * @returns A reactive `State<T>` instance.
 */
export function state<T>(): State<T | undefined>;
export function state<T>(initialValue: T): State<T>;
export function state<T>(initialValue?: T): State<T> {
  const { getter, subscribe } = createStateHandler(initialValue);
  return createState(getter, subscribe);
}

/**
 * @internal
 * Internal helper to compose a `State<T>` object from a getter and subscription logic.
 *
 * @template T The type of the value.
 * @param getter A function that returns the current state.
 * @param subscribe A function that allows subscribing to state changes.
 *
 * @returns A `State<T>` instance with additional reactive utilities.
 */
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

/**
 * @internal
 * Internal utility to build a `State<T>` with side effects from multiple sources.
 *
 * @template T The type of the value.
 * @param baseGetter A getter for the initial value.
 * @param baseSubscribe The subscription function to attach listeners.
 * @returns A builder interface for configuring side effects.
 */
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
      const { getter, subscribe, update, set } =
        createStateHandler(baseGetter());

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
