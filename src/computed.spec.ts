import { describe, it, expect } from "bun:test";
import { state } from "./state";
import { computed } from "./computed";
import { event } from "./event";

describe("computed", () => {
  it("should compute derived state", () => {
    const firstName = state("John");
    const lastName = state("Doe");
    const fullName = computed(() => `${firstName()} ${lastName()}`);
    expect(fullName()).toBe("John Doe");
  });

  it("should update computed state when dependencies change", () => {
    const updateName = event<string>();
    const updateLastName = event<string>();
    const firstName = state("John").on(updateName, (_, name) => name).create();
    const lastName = state("Doe").on(updateLastName, (_, name) => name).create();
    const fullName = computed(() => `${firstName()} ${lastName()}`);

    updateName("Jane");
    updateLastName("Smith");

    expect(fullName()).toBe("Jane Smith");
  });
});
