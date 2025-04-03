import { event } from "../event";
import {
  loadingState,
  successState,
  errorState,
  type AsyncStateValue,
} from "../helpers";
import type { OperatorFn } from "./types";

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
