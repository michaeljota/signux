import { event } from "../event";
import { describe, expect, it, mock } from "bun:test";
import { merge } from "./merge";

describe("merge", () => {
  it("should merge correctly", () => {
    const sourceA = event<number>();
    const sourceB = event<string>();
    const merged = sourceA.pipe(merge(sourceB));

    const result = mock();
    merged.subscribe(result);

    sourceA(1);
    sourceB("2");
    sourceA(3);
    expect(result).toHaveBeenCalledWith(1);
    expect(result).toHaveBeenCalledWith("2");
    expect(result).toHaveBeenCalledWith(3);
  });
});
