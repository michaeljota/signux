import { describe, it, expect, mock } from "bun:test";
import { event } from "../event";
import { throttle } from "./throttle";

describe("throttle Operator", () => {
  it("should emit the first value immediately and ignore the rest during the delay (lead mode)", async () => {
    const source = event<number>();
    const throttled = source.pipe(throttle(1, "lead"));
    const callback = mock();

    throttled.subscribe(callback);

    source(1);
    source(2);
    source(3);

    await new Promise((resolve) => setTimeout(resolve, 2));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);
  });

  it("should emit again after delay has passed (lead mode)", async () => {
    const source = event<number>();
    const throttled = source.pipe(throttle(1, "lead"));
    const callback = mock();

    throttled.subscribe(callback);

    source(1);
    await new Promise((resolve) => setTimeout(resolve, 2));
    source(2);
    await new Promise((resolve) => setTimeout(resolve, 2));
    source(3);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1);
    expect(callback).toHaveBeenNthCalledWith(2, 2);
    expect(callback).toHaveBeenNthCalledWith(3, 3);
  });

  it("should emit only the last value at the end of the delay (trail mode)", async () => {
    const source = event<number>();
    const throttled = source.pipe(throttle(1, "trail"));
    const callback = mock();

    throttled.subscribe(callback);

    source(1);
    source(2);
    source(3);

    await new Promise((resolve) => setTimeout(resolve, 2));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("should emit again after delay has passed (trail mode)", async () => {
    const source = event<number>();
    const throttled = source.pipe(throttle(1, "trail"));
    const callback = mock();

    throttled.subscribe(callback);

    source(1);
    await new Promise((resolve) => setTimeout(resolve, 2));
    source(2);
    await new Promise((resolve) => setTimeout(resolve, 2));
    source(3);
    await new Promise((resolve) => setTimeout(resolve, 2));

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1);
    expect(callback).toHaveBeenNthCalledWith(2, 2);
    expect(callback).toHaveBeenNthCalledWith(3, 3);
  });

  it("should emit nothing if only one value is sent and mode is trail", async () => {
    const source = event<number>();
    const throttled = source.pipe(throttle(1, "trail"));
    const callback = mock();

    throttled.subscribe(callback);

    source(42);
    await new Promise((resolve) => setTimeout(resolve, 2));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(42);
  });
});
