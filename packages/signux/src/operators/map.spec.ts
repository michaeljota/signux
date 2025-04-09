import { describe, expect, it, mock } from "bun:test";
import { map } from "./map";
import { event } from "../event";

describe("map", () => {
  it("should apply map correctly", () => {
    const source = event<number>();
    const mapped = source.pipe(
      map((x) => x * 2),
      map((x) => `${x}`),
    );

    const result = mock();

    mapped.subscribe(result);

    source(2);
    expect(result).toHaveBeenCalledWith("4");
  });
});
