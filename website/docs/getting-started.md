---
id: getting-started
title: Getting Started
sidebar_position: 2
---

# 🚀 Getting Started

This guide walks you through the basics of using **Signux** — from creating reactive state to composing updates and deriving values.

---

## 📦 Installation

```bash
bun add signux
# or
npm install signux
```

---

## 🧱 Reactive State

Create a reactive state with `state()`:

```ts
import { state } from "signux";

const counter = state(0);

console.log(counter()); // 0
```

By default, the state is **static** — it won't update unless you add reactive behavior with `.on(...)`.

---

## 🔁 Adding Reactions

You can add reactive behavior to a state by chaining `.on(...)` and finalizing with `.create()`:

```ts
import { event } from "signux";

const increment = event();
const counter = state(0)
  .on(increment, (current) => current + 1)
  .create();
```

Now every time `increment()` is called, the state updates:

```ts
increment();
console.log(counter()); // 1
```

---

## 🧠 Derived State

Use `computed()` to create a reactive value derived from other states:

```ts
import { computed } from "signux";

const double = computed(() => counter() * 2);
console.log(double()); // 2
```

`computed` values automatically track any reactive reads inside the function.
