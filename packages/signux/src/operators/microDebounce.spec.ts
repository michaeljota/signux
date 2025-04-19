import { describe, it, expect, mock } from "bun:test";
import { event } from "../event";
import { microDebounce } from "./microDebounce";

describe("microDebounce Operator", () => {
  it("should emit only the last value from a rapid burst of events", async () => {
    const source = event<number>();
    const debounced = source.pipe(microDebounce());
    const callback = mock();

    debounced.subscribe(callback);

    source(1);
    source(2);
    source(3);

    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("should emit multiple values if emitted in separate microtasks", async () => {
    const source = event<number>();
    const debounced = source.pipe(microDebounce());
    const callback = mock();

    debounced.subscribe(callback);

    source(1);
    await Promise.resolve();

    source(2);
    await Promise.resolve();

    source(3);
    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1);
    expect(callback).toHaveBeenNthCalledWith(2, 2);
    expect(callback).toHaveBeenNthCalledWith(3, 3);
  });
});
