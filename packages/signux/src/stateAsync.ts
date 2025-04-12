import { event } from "./event";
import { createStateHandler } from "./handlers";
import {
  errorState,
  loadingState,
  successState,
  type AsyncStateValue,
} from "./helpers";
import type { StateGetter, Subscribable } from "./types";

export interface StateAsync<T, P = void>
  extends StateGetter<AsyncStateValue<T>>,
    Subscribable<AsyncStateValue<T>> {
  fetch: (params: P) => void;
}

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
