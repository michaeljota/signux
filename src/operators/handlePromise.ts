import { event } from "../event";
import type { OperatorFn } from "./types";

export type AsyncSuccessValue<T> = {
  data: T;
  loading: false;
  error: null;
};

export type AsyncErrorValue<E> = {
  data: null;
  loading: false;
  error: E;
};

export type AsyncLoadingValue = {
  data: null;
  loading: true;
  error: null;
};

export type AsyncStateValue<T, E = unknown> =
  | AsyncSuccessValue<T>
  | AsyncErrorValue<E>
  | AsyncLoadingValue;

const loadingState = (): AsyncLoadingValue => ({
  data: null,
  loading: true,
  error: null,
});

const successState = <T>(data: T): AsyncSuccessValue<T> => ({
  data,
  loading: false,
  error: null,
});

const errorState = <E>(error: E): AsyncErrorValue<E> => ({
  data: null,
  loading: false,
  error,
});

export function handlePromise<T, R, E = unknown>(
  mapper: (value: T) => Promise<R>,
): OperatorFn<T, AsyncStateValue<R, E>> {
  return (source) => {
    const out = event<AsyncStateValue<R, E>>();
    let currentFetchId = 0;
    source.subscribe((value) => {
      currentFetchId++;
      const fetchId = currentFetchId;
      // Emitir el estado de carga
      out(loadingState());
      // Procesar la promesa
      mapper(value)
        .then((result) => {
          if (fetchId === currentFetchId) {
            out(successState(result));
          }
        })
        .catch((err) => {
          if (fetchId === currentFetchId) {
            out(errorState(err));
          }
        });
    });
    return out;
  };
}
