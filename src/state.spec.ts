import { describe, it, expect, mock } from "bun:test";
import { state } from "./state";
import { event } from "./event";

describe("state", () => {
  it("should return the initial state", () => {
    const myState = state("initial");
    expect(myState()).toBe("initial");
  });

  it("should update state when an event is triggered", () => {
    const updateEvent = event<string>();
    const myState = state("initial")
      .on(updateEvent, (_, newValue) => newValue)
      .create();
    updateEvent("updated");
    expect(myState()).toBe("updated");
  });

  it("should not update state when an event that was not added is triggered", () => {
    const updateEvent = event<string>();
    const resetState = event();
    const myState = state("initial")
      .on(updateEvent, (_, newValue) => newValue)
      .create();
    const reseteableState = myState.on(resetState, () => "initial").create();
    updateEvent("updated");
    expect(myState()).toBe("updated");
    expect(reseteableState()).toBe("updated");
    resetState();
    expect(myState()).toBe("updated");
    expect(reseteableState()).toBe("initial");
  });

  it("should notify listeners the state has been updated", () => {
    const updateEvent = event<string>();
    const myState = state("initial")
      .on(updateEvent, (_, newValue) => newValue)
      .create();
    const mockListener = mock();
    myState.subscribe(mockListener);
    updateEvent("updated");

    expect(mockListener).toHaveBeenCalledWith("updated");
  });

  it("should pipe ", () => {
    const updateEvent = event<string>();
    const myState = state("initial")
      .on(updateEvent, (_, newValue) => newValue)
      .create();
    const pipeResult = myState.pipe();
    updateEvent("test");

    expect(pipeResult()).toBe("test");
  });
});
