export type AsyncSuccessValue<T> = {
  data: T;
  loading: false;
  error: never;
};

export type AsyncErrorValue<E> = {
  data: never;
  loading: false;
  error: E;
};

export type AsyncLoadingValue = {
  data: never;
  loading: true;
  error: never;
};

export type AsyncStateValue<T, E = unknown> =
  | AsyncSuccessValue<T>
  | AsyncErrorValue<E>
  | AsyncLoadingValue;

export const loadingState = (): AsyncLoadingValue => ({
  loading: true,
  data: void 0 as never,
  error: void 0 as never,
});

export const successState = <T>(data: T): AsyncSuccessValue<T> => ({
  data,
  loading: false,
  error: void 0 as never,
});

export const errorState = <E>(error: E): AsyncErrorValue<E> => ({
  error,
  loading: false,
  data: void 0 as never,
});
