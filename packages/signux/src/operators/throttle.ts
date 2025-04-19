import { event } from "../event";
import type { OperatorFn, ThrottleMode } from "./types";

/**
 * Creates an operator that limits how frequently values are emitted from the source.
 *
 * Depending on the selected mode, the operator can emit:
 * - `"lead"` (default): the **first** value immediately, then ignore the rest until the delay passes.
 * - `"trail"`: the **last** value received during the delay, emitted once the delay finishes.
 *
 * Useful for controlling frequency of events such as scroll, resize, or input
 * when the system must not react too frequently.
 *
 * @template T The type of values emitted by the source.
 * @param delay Time in milliseconds to wait before accepting a new value.
 * @param mode `"lead"` to emit the first value immediately, `"trail"` to emit the last one at the end.
 * @returns An operator function that throttles emissions from the source.
 */
export function throttle<T>(
  delay: number,
  mode: ThrottleMode = "lead",
): OperatorFn<T> {
  return (source) => {
    const out = event<T>();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let latestPayload: T;

    source.subscribe((payload) => {
      latestPayload = payload;
      if (timeoutId != null) {
        return;
      }

      mode === "lead" && out(payload);
      timeoutId = setTimeout(() => {
        mode === "trail" && out(latestPayload);
        clearTimeout(timeoutId);
        timeoutId = void 0;
      }, delay);
    });

    return out;
  };
}
