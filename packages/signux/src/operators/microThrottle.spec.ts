import { describe, it, expect, mock } from "bun:test";
import { event } from "../event";
import { microThrottle } from "./microThrottle";

describe("microThrottle Operator", () => {
  it("should emit only the first value from a burst of events", async () => {
    const source = event<number>();
    const throttled = source.pipe(microThrottle());
    const callback = mock();

    throttled.subscribe(callback);

    source(1);
    source(2);
    source(3);

    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);
  });

  it("should emit again after the microtask has passed", async () => {
    const source = event<number>();
    const throttled = source.pipe(microThrottle());
    const callback = mock();

    throttled.subscribe(callback);

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

  it("should ignore rapid events within the same microtask", async () => {
    const source = event<string>();
    const throttled = source.pipe(microThrottle());
    const callback = mock();

    throttled.subscribe(callback);

    ["a", "b", "c"].forEach(source);

    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");
  });
});
