import { autoTrackCallback } from "./auto-tracker";

/**
 * Registers a reactive effect that automatically tracks its dependencies.
 *
 * The provided `callback` will run immediately, and re-run whenever
 * any of the reactive sources it accesses change.
 *
 * This is useful for triggering side effects (like logging, DOM updates,
 * or external interactions) in response to reactive state changes.
 *
 * @param callback A function that uses reactive values and triggers side effects.
 */
export function effect(callback: () => void) {
  autoTrackCallback(callback);
}
