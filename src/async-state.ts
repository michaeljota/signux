import { event } from "./event";
import { createStateHandler } from "./handlers";
import type { StateGetter, Subscribable } from "./types";

export interface AsyncState<T, P = void>
  extends StateGetter<AsyncStateValue<T>>,
    Subscribable<AsyncStateValue<T>> {
  fetch: (params: P) => void;
}

type AsyncSuccessValue<T> = {
  data: T;
  loading: false;
  error: never;
};

type AsyncErrorValue<E> = {
  data: never;
  loading: false;
  error: E;
};

type AsyncLoadingValue = {
  data: never;
  loading: true;
  error: never;
};

type AsyncStateValue<T, E = unknown> =
  | AsyncSuccessValue<T>
  | AsyncErrorValue<E>
  | AsyncLoadingValue;

const loadingState = (): AsyncLoadingValue => ({
  loading: true,
  data: void 0 as never,
  error: void 0 as never,
});

const successState = <T>(data: T): AsyncSuccessValue<T> => ({
  data,
  loading: false,
  error: void 0 as never,
});

const errorState = <E>(error: E): AsyncErrorValue<E> => ({
  error,
  loading: false,
  data: void 0 as never,
});

export function asyncState<T, P = void>(
  fetcher: (params: P) => Promise<T>,
  initialValue?: T,
): AsyncState<T, P> {
  const { getter, set, subscribe } = createStateHandler<AsyncStateValue<T>>(
    initialValue ? successState(initialValue) : loadingState(),
  );
  const fetchEvent = event<P>();
  let fetchID = 0;

  fetchEvent.subscribe((params) => {
    const currentFetchID = fetchID++;
    set(loadingState());

    fetcher(params)
      .then((value) => {
        if (fetchID !== currentFetchID) {
          return;
        }
        set(successState(value));
      })
      .catch((err) => {
        if (fetchID !== currentFetchID) {
          return;
        }
        set(errorState(err));
      });
  });

  const fetch = (params: P) => fetchEvent(params);

  return Object.assign(getter, { subscribe, fetch });
}
