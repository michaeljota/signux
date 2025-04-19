import { describe, it, expect, jest } from "bun:test";

import { event } from "./event";
import { getResultEvent } from "./handlers";
import { map, filter } from "./operators";
import { state } from "./state";
import { computed } from "./computed";

describe("getResultEvent", () => {
  it("should apply all operators and transform the values", () => {
    const source = event<number>();

    const doubledGreaterThanFive = getResultEvent<number, number>(
      source.subscribe,
      [map((n) => n * 2), filter((n) => n > 5)],
    );

    const spy = jest.fn();
    doubledGreaterThanFive.subscribe(spy);

    source(2);
    source(3);
    source(5);

    expect(spy).toHaveBeenNthCalledWith(1, 6);
    expect(spy).toHaveBeenNthCalledWith(2, 10);
  });

  it("should create another event independent from the original event", () => {
    const source = event<string>();

    const mirrored = getResultEvent<string, string>(source.subscribe, []);

    const sourceSpy = jest.fn();
    const mirrorSoy = jest.fn();
    source.subscribe(sourceSpy);
    mirrored.subscribe(mirrorSoy);

    source("ping");
    mirrored("pong");

    expect(sourceSpy).toHaveBeenNthCalledWith(1, "ping");
    expect(sourceSpy).toHaveBeenCalledTimes(1);
    expect(mirrorSoy).toHaveBeenNthCalledWith(1, "ping");
    expect(mirrorSoy).toHaveBeenNthCalledWith(2, "pong");
  });

  it("should return an event", () => {
    const source = event<string>();
    const mirrored = getResultEvent<string, string>(source.subscribe, []);

    expect(Object.keys(mirrored).sort()).toEqual(Object.keys(source).sort());

    const spy = jest.fn();

    mirrored.subscribe(spy);

    source("ping");
    mirrored("pong");

    expect(spy).toHaveBeenNthCalledWith(1, "ping");
    expect(spy).toHaveBeenNthCalledWith(2, "pong");
  });

  it("should have pipe and toState methods with an event source", () => {
    const source = event<number>();
    const mirrored = getResultEvent<number, number>(source.subscribe, []);
    const doubled = mirrored.pipe(map((n) => n * 2)).toState(0);

    expect(doubled()).toBe(0);

    source(3);
    expect(doubled()).toBe(6);

    mirrored(5);
    expect(doubled()).toBe(10);
  });

  it("should have pipe and toState methods with a state source", () => {
    const source = state<number>(1);
    const mirrored = getResultEvent<number, number>(source.subscribe, []);
    const doubled = mirrored.pipe(map((n) => n * 2)).toState(0);

    expect(doubled()).toBe(0);

    mirrored(5);
    expect(doubled()).toBe(10);
  });

  it("should have pipe and toState methods with a computed source", () => {
    const source = state<number>(1);
    const computedSource = computed(() => source());
    const mirrored = getResultEvent<number, number>(
      computedSource.subscribe,
      [],
    );
    const doubled = mirrored.pipe(map((n) => n * 2)).toState(0);

    expect(doubled()).toBe(0);

    mirrored(5);
    expect(doubled()).toBe(10);
  });
});
