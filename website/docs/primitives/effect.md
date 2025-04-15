---
sidebar_position: 5
---

# Effect

`effect(fn: () => void)`

Runs a reactive side effect whenever its dependencies change.  
Useful for logging, DOM updates, analytics, or triggering actions based on reactive state.

---

## ✅ Basic usage

```ts
import { state, effect, event } from "signux";

const increment = event();
const count = state(0)
  .on(increment, (s) => s + 1)
  .create();

effect(() => {
  console.log("Count changed to:", count());
});

increment(); // logs: Count changed to: 1
```

Every time `count()` changes, the `effect` is re-executed.

---

## ⚙️ How it works

`effect(fn)` will automatically track any reactive values it reads during the execution of `fn`.  
If any of those values change, it re-runs the function.

---

## 🧼 Cleanup

There is no built-in automatic teardown — effects stay active until the environment is disposed.  
For integration in frameworks (like React), consider creating scoped wrappers.

---

## 🔁 Compared to computed

- `computed()` derives a **new value**
- `effect()` runs a **side effect**

---

## 📦 API

- `effect(fn: () => void)` → runs the function reactively
