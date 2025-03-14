import { describe, it, expect, mock } from "bun:test";
import { event } from "./event";

describe("event", () => {
  it("should notify listeners when emitted", () => {
    const myEvent = event<string>();
    const mockListener = mock();
    myEvent.subscribe(mockListener);
    myEvent("test");
    expect(mockListener).toHaveBeenCalledWith("test");
  });

  it("should create a state", () => {
    const myEvent = event<string>();
    const state = myEvent.toState();
    myEvent("test");
    expect(state()).toBe("test");
  });

  it("should pipe ", () => {
    const myEvent = event<string>();
    const pipeResult = myEvent.pipe();
    const spy = mock();
    pipeResult.subscribe(spy);
    myEvent("test");

    expect(spy).toHaveBeenCalledWith("test");
  });
});
