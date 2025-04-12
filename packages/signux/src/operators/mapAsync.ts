import { event } from "../event";
import {
  loadingState,
  successState,
  errorState,
  type AsyncStateValue,
} from "../helpers";
import type { OperatorFn } from "./types";

/**
 * Creates an operator that maps each value from the source to a Promise,
 * and emits an `AsyncStateValue<R>` representing the async operation's status.
 *
 * Emits:
 * - `loading` immediately when the promise starts,
 * - `success` when it resolves,
 * - `error` if it rejects.
 *
 * If multiple values are emitted in quick succession, only the result
 * of the latest one will be applied (previous ones are discarded).
 *
 * @template T The type of the source value.
 * @template R The type of the resolved result.
 * @template E The type of the error (default: `unknown`).
 * @param promiseFn A function that transforms a value `T` into a `Promise<R>`.
 * @returns An operator that emits `AsyncStateValue<R, E>` objects.
 */
export function mapAsync<T, R, E = unknown>(
  promiseFn: (value: T) => Promise<R>,
): OperatorFn<T, AsyncStateValue<R, E>> {
  return (source) => {
    const out = event<AsyncStateValue<R, E>>();
    let currentFetchId = 0;
    source.subscribe(async (value) => {
      currentFetchId++;
      const fetchId = currentFetchId;
      out(loadingState());
      try {
        const result = await promiseFn(value);
        if (fetchId === currentFetchId) {
          out(successState(result));
        }
      } catch (error: any) {
        if (fetchId === currentFetchId) {
          out(errorState(error));
        }
      }
    });
    return out;
  };
}
