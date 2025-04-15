---
sidebar_position: 3
---

# Computed

`computed<T>(fn: () => T)`

Creates a read-only reactive value that is derived from other reactive sources.  
The function you pass will automatically track its dependencies.

---

## ✅ Basic usage

```ts
import { state, computed } from "signux";

const count = state(2);
const double = computed(() => count() * 2);

console.log(double()); // 4
```

---

## ⚙️ How it works

The function inside `computed(...)` is re-executed whenever any reactive value it reads changes.

You don't need to declare dependencies — they are tracked automatically:

```ts
const increase = event();
const a = state(1)
  .on(increase, (n) => n + 1)
  .create();

const b = state(2);

const sum = computed(() => a() + b());

console.log(sum()); // 3

increase();

console.log(sum()); // 4
```

---

## 🔐 Computed values are read-only

You cannot add reactions to a `computed` directly — it is always derived from other state:

```ts
const total = computed(() => count() * 100);
// total.on(...) ❌ not allowed
```

---

## 🔁 With `.pipe(...)`

Like other reactive primitives, you can transform computed values:

```ts
const normalized = double.pipe(map((n) => Math.floor(n / 10)));
```

---

## 📦 API

A `ComputedState<T>` exposes:

- `(): T` → get the current derived value
- `subscribe(fn)` → listen to changes
- `.pipe(...operators)` → create derived reactive streams
