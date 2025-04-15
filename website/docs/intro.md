---
id: intro
title: What is Signux?
sidebar_position: 1
---

# 🧩 Signux

**Signux** is a minimal, fine-grained reactive system for JavaScript and TypeScript — composable, testable, and framework-agnostic.

It provides a small set of primitives that let you model reactive state, events, and derived values without magic or boilerplate.

---

## ✨ Why Signux?

Most state management solutions are either:

- Too complex or framework-specific
- Too magical or hard to debug
- Based on immutable snapshots and force re-renders

Signux is different:

- ✅ **Small and focused**: only the primitives you need
- ✅ **No proxies or magic**: everything is explicit
- ✅ **Fully typed**: works perfectly with TypeScript
- ✅ **Composable**: functional APIs like `.pipe(...)`
- ✅ **Flexible**: can be used with or without a framework

---

## 🛠 Primitives

Signux provides just a few building blocks:

- `state(value)` → reactive state container
- `computed(fn)` → derived value that updates automatically
- `event<T>()` → stream of values that can be subscribed to
- `.pipe(...)` → chain operators for functional composition
- `stateAsync(fetcher)` → reactive async state pattern
- `effect(fn)` → run a reactive side effect

---

## 📦 Installation

```bash
bun add signux
# or
npm install signux
```

---

## 🔁 Example

```ts
import { state, computed, event } from "signux";

const increment = event();
const count = state(0)
  .on(increment, (count) => count++)
  .create();
const double = computed(() => count() * 2);

console.log(double()); // 0

increment();
console.log(double()); // 4
```

---

## ⚠️ Disclaimer

**Signux is an experimental library.** While fully functional, it is still a work in progress and not optimized for production-scale performance.

Its main purpose is to explore the relationship between **functional programming** and **reactive programming**, and how reactivity can provide an elegant, immutable alternative to traditional state management in functional systems.

- The API is minimal by design, and may evolve as ideas solidify.
- Some performance optimizations or edge cases are not yet covered.
- It prioritizes **clarity, composition, and correctness** over abstraction or performance (for now).

If you find it useful — awesome! But treat it as a learning tool or prototype foundation rather than a drop-in production solution.
