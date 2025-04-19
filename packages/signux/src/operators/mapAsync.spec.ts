import { describe, it, expect, mock } from "bun:test";
import { event } from "../event";
import { mapAsync } from "./mapAsync";

describe("mapAsync", () => {
  it("should emit loading state then success state when promise resolves", async () => {
    const fakeFetcher = (x: number) =>
      new Promise<number>((resolve) => {
        setTimeout(() => resolve(x * 2), 50);
      });
    const source = event<number>();
    const asyncStream = source.pipe(mapAsync(fakeFetcher));
    const callback = mock();

    asyncStream.subscribe(callback);

    source(5);
    expect(callback).toHaveBeenCalledWith({
      data: undefined,
      loading: true,
      error: undefined,
    });

    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(callback).toHaveBeenCalledWith({
      data: 10,
      loading: false,
      error: undefined,
    });
  });

  it("should emit loading state then error state when promise rejects", async () => {
    const err = new Error("error occurred");
    const fakeFetcher = () =>
      new Promise<number>((_resolve, reject) => {
        setTimeout(() => reject(err), 50);
      });
    const source = event<number>();
    const asyncStream = source.pipe(mapAsync(fakeFetcher));
    const callback = mock();

    asyncStream.subscribe(callback);

    source(5);
    expect(callback).toHaveBeenCalledWith({
      data: undefined,
      loading: true,
      error: undefined,
    });

    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(callback).toHaveBeenCalledWith({
      data: undefined,
      loading: false,
      error: err,
    });
  });

  it("should cancel previous promise if a new one is fired", async () => {
    let resolveFirst: (value: number) => void;
    const firstPromise = new Promise<number>((resolve) => {
      resolveFirst = resolve;
    });
    const fakeFetcher = (x: number) => {
      if (x === 1) {
        return firstPromise;
      } else {
        return Promise.resolve(x * 2);
      }
    };
    const source = event<number>();
    const asyncStream = source.pipe(mapAsync(fakeFetcher));
    const callback = mock();

    asyncStream.subscribe(callback);

    source(1);
    expect(callback).toHaveBeenCalledWith({
      data: undefined,
      loading: true,
      error: undefined,
    });
    source(2);
    expect(callback).toHaveBeenCalledWith({
      data: undefined,
      loading: true,
      error: undefined,
    });

    resolveFirst!(10);

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(callback).toHaveBeenCalledWith({
      data: 4,
      loading: false,
      error: undefined,
    });
  });
});
