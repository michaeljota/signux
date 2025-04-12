/**
 * Represents a successful async state, containing the resolved `data`
 * and indicating that the operation is no longer loading or in error.
 *
 * @template T The type of the resolved data.
 */
export type AsyncSuccessValue<T> = {
  data: T;
  loading: false;
  error: never;
};

/**
 * Represents a failed async state, containing the `error` and
 * indicating that the operation is no longer loading or successful.
 *
 * @template E The type of the error.
 */
export type AsyncErrorValue<E> = {
  data: never;
  loading: false;
  error: E;
};

/**
 * Represents an ongoing async operation.
 * No data or error is available yet.
 */
export type AsyncLoadingValue = {
  data: never;
  loading: true;
  error: never;
};

/**
 * Union type describing the state of an asynchronous operation.
 * It can be:
 * - `loading`
 * - `success` (with data)
 * - `error` (with error)
 *
 * @template T The type of the successful result.
 * @template E The type of the error.
 */
export type AsyncStateValue<T, E = unknown> =
  | AsyncSuccessValue<T>
  | AsyncErrorValue<E>
  | AsyncLoadingValue;

/**
 * @internal
 * Creates a loading state for an async operation.
 *
 * @returns An `AsyncLoadingValue` indicating that the operation is in progress.
 */
export const loadingState = (): AsyncLoadingValue => ({
  loading: true,
  data: void 0 as never,
  error: void 0 as never,
});

/**
 * @internal
 * Creates a success state for an async operation.
 *
 * @template T The type of the resolved data.
 * @param data The result of the successful async operation.
 * @returns An `AsyncSuccessValue<T>`.
 */
export const successState = <T>(data: T): AsyncSuccessValue<T> => ({
  data,
  loading: false,
  error: void 0 as never,
});

/**
 * @internal
 * Creates an error state for an async operation.
 *
 * @template E The type of the error.
 * @param error The error thrown by the failed async operation.
 * @returns An `AsyncErrorValue<E>`.
 */
export const errorState = <E>(error: E): AsyncErrorValue<E> => ({
  error,
  loading: false,
  data: void 0 as never,
});
