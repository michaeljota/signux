import { describe, expect, it } from "bun:test";
import { stateAsync } from "./stateAsync";

const fetcher = async () => {
  await sleep(10);
  return "fetched";
};

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

describe("stateAsync", () => {
  it("starts in loading state when no initialValue is provided", () => {
    const store = stateAsync(fetcher);

    const { loading, data, error } = store();

    expect(loading).toBe(true);
    expect(data).toBeUndefined();
    expect(error).toBeUndefined();
  });

  it("starts in success state when initialValue is provided", () => {
    const store = stateAsync(fetcher, "initial");

    const { loading, data, error } = store();

    expect(loading).toBe(false);
    expect(data).toBe("initial");
    expect(error).toBeUndefined();
  });

  it("goes to success state after a successful fetch", async () => {
    const store = stateAsync(fetcher);
    store.fetch();
    {
      const { loading, data } = store();
      expect(loading).toBe(true);
      expect(data).toBeUndefined();
    }

    await sleep(15);

    {
      const { data, error, loading } = store();
      expect(loading).toBe(false);
      expect(data).toBe("fetched");
      expect(error).toBeUndefined();
    }
  });

  it("goes to error state after a failed fetch", async () => {
    const fetcher = async () => {
      await sleep(10);
      throw new Error("boom!");
    };

    const store = stateAsync(fetcher);
    store.fetch();

    const { loading, error } = store();
    expect(loading).toBe(true);
    expect(error).toBeUndefined();

    await new Promise<void>((resolve) => {
      setInterval(() => !store().loading && resolve(), 1);
    });

    const result = store();
    expect(result.loading).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.error).toEqual(new Error("boom!"));
  });

  it("only applies result of the latest fetch call", async () => {
    let resolveA!: (v: string) => void;
    let resolveB!: (v: string) => void;

    const fetcher = (params: string) => {
      return new Promise<string>((res) => {
        if (params === "a") resolveA = res;
        if (params === "b") resolveB = res;
      });
    };

    const store = stateAsync(fetcher);
    store.fetch("a");
    store.fetch("b");

    resolveA("A done");
    await Promise.resolve();

    let state = store();
    expect(state.loading).toBe(true);
    expect(state.data).toBeUndefined();

    resolveB("B done");
    await Promise.resolve();

    state = store();
    expect(state.loading).toBe(false);
    expect(state.data).toBe("B done");
  });
});
