import { describe, expect, it, mock } from "bun:test";
import { filter } from "./filter";
import { event } from "../event";

describe("filter", () => {
  it("should apply filter correctly", () => {
    const source = event<number>();
    const filtered = source.pipe(filter((x) => x > 5));

    const result = mock();

    filtered.subscribe(result);

    source(3);
    expect(result).not.toHaveBeenCalled();
    source(7);
    expect(result).toHaveBeenCalledWith(7);
  });
});
