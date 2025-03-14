import type { ComputedState } from "./computed";
import type { NoEmitterEvent } from "./event";
import type { OperatorFn } from "./operators/types";
import type { State } from "./state";

export interface Subscribable<T> {
  subscribe(this: void, listener: EventEmitter<T>): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PipeOperatorsDefault = Array<OperatorFn<any, any>>;
export type PipeResult<T, S extends Pipeable<T>> = S extends ComputedState<T>
  ? ComputedState<T>
  : S extends State<T>
  ? ComputedState<T>
  : NoEmitterEvent<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PipeFn<T, S extends Pipeable<any>> {
  (): PipeResult<T, S>;
  <A>(op1: OperatorFn<NonNullable<T>, A>): PipeResult<A, S>;
  <A, B>(op1: OperatorFn<NonNullable<T>, A>, op2: OperatorFn<A, B>): PipeResult<
    B,
    S
  >;
  <A, B, C>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
  ): PipeResult<C, S>;
  <A, B, C, D>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
  ): PipeResult<D, S>;
  <A, B, C, D, E>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
  ): PipeResult<E, S>;
  <A, B, C, D, E, F>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
  ): PipeResult<F, S>;
  <A, B, C, D, E, F, G>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
  ): PipeResult<G, S>;
  <A, B, C, D, E, F, G, H>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
    op8: OperatorFn<G, H>,
  ): PipeResult<H, S>;
  <A, B, C, D, E, F, G, H, I>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
    op8: OperatorFn<G, H>,
    op9: OperatorFn<H, I>,
  ): PipeResult<I, S>;
  <A, B, C, D, E, F, G, H, I, J>(
    op1: OperatorFn<NonNullable<T>, A>,
    op2: OperatorFn<A, B>,
    op3: OperatorFn<B, C>,
    op4: OperatorFn<C, D>,
    op5: OperatorFn<D, E>,
    op6: OperatorFn<E, F>,
    op7: OperatorFn<F, G>,
    op8: OperatorFn<G, H>,
    op9: OperatorFn<H, I>,
    op10: OperatorFn<I, J>,
  ): PipeResult<J, S>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <R>(...ops: OperatorFn<any, any>[]): PipeResult<R, S>;
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
