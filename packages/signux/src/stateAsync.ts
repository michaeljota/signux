import { event } from "./event";
import { createStateHandler } from "./handlers";
import {
  errorState,
  loadingState,
  successState,
  type AsyncStateValue,
} from "./helpers";
import type { StateGetter, Subscribable } from "./types";

/**
 * A reactive state representing the lifecycle of an asynchronous operation:
 * loading, success, or error.
 *
 * It exposes a `.fetch(params)` method to trigger the operation,
 * and reflects its current status using a `AsyncStateValue<T>` shape.
 *
 * @template T The type of the successful result.
 * @template P The type of the parameters expected by the async function.
 */
export interface StateAsync<T, P = void>
  extends StateGetter<AsyncStateValue<T>>,
    Subscribable<AsyncStateValue<T>> {
  /**
   * Triggers the async operation with the given parameters.
   * Updates the internal state to reflect loading, success, or error.
   *
   * @param params Parameters passed to the async `fetcher` function.
   */
  fetch: (params: P) => void;
}

/**
 * Creates a reactive state tied to an asynchronous operation.
 *
 * The returned state reflects the current status of the async call using
 * a discriminated union: loading, success, or error. It is updated automatically
 * as the async operation progresses.
 *
 * Calling `.fetch(params)` will trigger the operation. If multiple requests
 * are made in sequence, only the latest result will be applied (previous ones are ignored).
 *
 * @template T The type of the resolved value.
 * @template P The type of the parameters for the async function.
 * @param fetcher An async function that receives params and returns a promise.
 * @param initialValue Optional initial successful value to pre-fill the state.
 * @returns A `StateAsync<T, P>` representing the async operation state.
 */
export function stateAsync<T, P = void>(
  fetcher: (params: P) => Promise<T>,
  initialValue?: T,
): StateAsync<T, P> {
  const { getter, set, subscribe } = createStateHandler<AsyncStateValue<T>>(
    initialValue ? successState(initialValue) : loadingState(),
  );
  const fetchEvent = event<P>();
  let fetchID = 0;

  fetchEvent.subscribe(async (params) => {
    const currentFetchID = ++fetchID;
    set(loadingState());

    try {
      const result = await fetcher(params);
      if (fetchID === currentFetchID) {
        set(successState(result));
      }
    } catch (error: any) {
      if (fetchID === currentFetchID) {
        set(errorState(error));
      }
    }
  });

  const fetch = (params: P) => fetchEvent(params);

  return Object.assign(getter, { subscribe, fetch });
}
