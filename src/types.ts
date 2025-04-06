import type { ComputedState } from "./computed";
import type { NoEmitterEvent } from "./event";
import type { OperatorFn } from "./operators/types";
import type { State } from "./state";

export interface Subscribable<T> {
  subscribe(this: void, listener: EventEmitter<T>): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PipeOperatorsDefault = Array<OperatorFn<any, any>>;
export type PipeResult<S extends Pipeable<T>, T> = S extends ComputedState<T>
  ? ComputedState<T>
  : S extends State<T>
  ? ComputedState<T>
  : NoEmitterEvent<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <R>(...ops: OperatorFn<any, any>[]): PipeResult<S, R>;
}

export interface Pipeable<T> {
  pipe: PipeFn<T, this>;
}

export interface EventEmitter<T> {
  (payload: T): void;
}

export interface StateGetter<T> {
  (): T;
}
