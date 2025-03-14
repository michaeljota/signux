import { describe, it, expect, mock } from "bun:test";
import { event } from "./event";
import { state } from "./state";
import { effect } from "./effect";

describe("effect", () => {
  it("should react to state changes", () => {
    const updateState = event<string>();
    const myState = state("initial").on(updateState, (_, state) => state);
    const tester = mock();

    effect(() => {
      tester(myState());
    });

    expect(tester).toHaveBeenCalledWith("initial");

    updateState("updated");
    expect(tester).toHaveBeenCalledWith("updated");
  });
});
