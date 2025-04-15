---
sidebar_position: 1
---

# How to use them?

Operators can be applied using the `pipe()` method. This method is available on all reactive sources in Signux (`state`, `event`, `computed`).  
It allows you to create new reactive flows by composing operators in a functional, readable way.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { map, filter } from "signux/operators";

const input = event<number>();

const even = input.pipe(
  filter((n) => n % 2 === 0),
  map((n) => n * 10),
);
```

:::info
Note: operators are applied **in order**, from left to right — just like a function pipeline.

```ts
const result = input.pipe(opA, opB, opC);
// equivalent to: opC(opB(opA(input)))
```

:::

---

## 📦 Pipe result types

Depending on the source, `pipe()` returns:

| Source     | Returns            |
| ---------- | ------------------ |
| `event`    | `ReadonlyEvent<T>` |
| `state`    | `ComputedState<T>` |
| `computed` | `ComputedState<T>` |

This ensures that `.pipe(...)` flows can be consumed like regular state when needed.

---

## ⚙️ Creating custom operators

Operators are pure functions with the following signature:

```ts
type OperatorFn<T, R = T> = (source: Subscribable<T>) => Event<R>;
```

You can define your own, with the logic you want. You only need to subscribe to the source, and create another event to return it.

```ts
const square: OperatorFn<number> = (source) => {
  const out = event<number>();
  source.subscribe((n) => out(n * n));
  return out;
};
```

---

## 🧩 Built-in operators

| Operator   | Description                       |
| ---------- | --------------------------------- |
| `map`      | Transforms values                 |
| `filter`   | Filters values                    |
| `debounce` | Delays values                     |
| `mapAsync` | Maps to async values with loading |
| `merge`    | Merges multiple sources           |
