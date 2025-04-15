---
sidebar_position: 1
---

# State

`state<T>(initialState?: T)`

Creates a reactive state container. It holds a value, lets you read it like a function, and subscribe to updates.

---

## ✅ Basic usage

```ts
import { state } from "signux";

const count = state(0);

console.log(count()); // 0
```

## ⚡ Adding reactions

Calling `state(0)` creates a state that doesn't change by itself.
If you want it to react to something, use `.on(...)` and `.create()`:

```ts
import { event } from "signux";

const increment = event();
const count = state(0)
  .on(increment, (current) => current + 1)
  .create();
```

---

## 📦 API

A `State<T>` exposes:

- `(): T` → get the current value
- `subscribe(fn)` → listen to updates
- `.on(source, reducer)` → define how it reacts to external events
- `.pipe(...operators)` → apply reactive transformations

---

## ✍️ Example: counter

```ts
const increment = event();
const decrement = event();

const count = state(0)
  .on(increment, (n) => n + 1)
  .on(decrement, (n) => n - 1)
  .create();
```

---

## ℹ️ Notes

- If you don't add reactions with `.on()`, the state is read-only and constant.
- Every `.on(...)` returns a builder. Only `.create()` returns the final state.
- You can use `.pipe(...)` at any point to create derived data streams.
