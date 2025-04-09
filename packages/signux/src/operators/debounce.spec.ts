import { describe, it, expect, mock } from "bun:test";
import { event } from "../event";
import { debounce } from "./debounce";

describe("Debounce Operator", () => {
  it("should emit only the last value when events are emitted rapidly", async () => {
    const source = event<number>();
    const debounced = source.pipe(debounce(100));
    const callback = mock();

    debounced.subscribe(callback);

    source(1);
    await new Promise((resolve) => setTimeout(resolve, 50));
    source(2);
    await new Promise((resolve) => setTimeout(resolve, 50));
    source(3);

    await new Promise((resolve) => setTimeout(resolve, 120));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it("should emit separate events if there is enough delay between them", async () => {
    const source = event<number>();
    const debounced = source.pipe(debounce(100));
    const callback = mock();

    debounced.subscribe(callback);

    source(1);
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);

    source(2);
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(2);
  });
});
