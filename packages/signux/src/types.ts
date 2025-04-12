import type { ComputedState } from "./computed";
import type { NoEmitterEvent } from "./event";
import type { OperatorFn } from "./operators/types";
import type { State } from "./state";

/**
 * Represents any reactive source that supports subscriptions.
 *
 * @template T The type of values emitted by the source.
 */
export interface Subscribable<T> {
  subscribe(this: void, listener: EventEmitter<T>): void;
}

/**
 * A function that emits a value to all current subscribers.
 *
 * @template T The type of the payload being emitted.
 */
export interface EventEmitter<T> {
  (payload: T): void;
}

/**
 * A function that returns the current value of a reactive state.
 *
 * Used by `State` and `ComputedState` to expose their current value.
 *
 * @template T The type of the stored value.
 */
export interface StateGetter<T> {
  (): T;
}

/**
 * Marks a reactive primitive as pipeable.
 *
 * Provides a `.pipe(...)` method for composing reactive operators.
 *
 * @template T The value type emitted by the source.
 */
export interface Pipeable<T> {
  pipe: PipeFn<T, this>;
}

/**
 * A list of operators to apply in a reactive `pipe(...)` chain.
 */
export type PipeOperatorsDefault = Array<OperatorFn<any, any>>;

/**
 * @internal
 * Determines the type returned by calling `.pipe(...)` on a given source.
 *
 * - If piped from a `State` or `ComputedState`, the result is a `ComputedState`.
 * - Otherwise, the result is a `NoEmitterEvent`.
 *
 * @template S The source type.
 * @template T The value type of the source.
 */
type PipeResult<S extends Pipeable<T>, T> =
  S extends ComputedState<T>
    ? ComputedState<T>
    : S extends State<T>
      ? ComputedState<T>
      : NoEmitterEvent<T>;

/**
 * Represents the `.pipe(...)` method used to chain reactive operators.
 *
 * Supports 0–10 explicitly typed operators for strong inference,
 * then falls back to a variadic version.
 *
 * @template T The initial input value type.
 * @template S The type of the source implementing `Pipeable<T>`.
 */
export interface PipeFn<T, S extends Pipeable<any>> {
  (): PipeResult<S, T>;
  <A>(op1: OperatorFn<T, A>): PipeResult<S, A>;
  <A, B>(op1: OperatorFn<T, A>, op2: OperatorFn<A, B>): PipeResult<S, B>;
  <A, B, C>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
  ): PipeResult<S, C>;
  <A, B, C, D>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
  ): PipeResult<S, D>;
  <A, B, C, D, E>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
  ): PipeResult<S, E>;
  <A, B, C, D, E, F>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
  ): PipeResult<S, F>;
  <A, B, C, D, E, F, G>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
  ): PipeResult<S, G>;
  <A, B, C, D, E, F, G, H>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
    op8: OperatorFn<G, H>,
  ): PipeResult<S, H>;
  <A, B, C, D, E, F, G, H, I>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
    op8: OperatorFn<G, H>,
    op9: OperatorFn<H, I>,
  ): PipeResult<S, I>;
  <A, B, C, D, E, F, G, H, I, J>(
    op1: OperatorFn<T, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
    op8: OperatorFn<G, H>,
    op9: OperatorFn<H, I>,
    op10: OperatorFn<I, J>,
  ): PipeResult<S, J>;
  <R>(...ops: OperatorFn<any, any>[]): PipeResult<S, R>;
}
