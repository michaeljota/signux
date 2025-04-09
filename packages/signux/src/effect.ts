import { autoTrackCallback } from "./auto-tracker";

export function effect(callback: () => void) {
  autoTrackCallback(callback);
}
