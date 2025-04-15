# debounce

The `debounce` operator delays the emission of values until after a pause in activity.

Useful for scenarios like user typing, scroll events, or batching updates.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { debounce } from "signux/operators";

const input = event<string>();
const debounced = input.pipe(debounce(300));

debounced.subscribe((value) => {
  console.log("Debounced value:", value);
});

input("a");
input("ab");
input("abc"); // ← only this is emitted, after 300ms
```

---

## ⚙️ How it works

Each time the source emits a value, the debounce timer resets.  
Only the last value is emitted after the delay has passed without new emissions.

---

## 🧩 Use cases

- Input fields with async validation
- Throttle rapid user input
- Avoid redundant API calls

---

## 📦 Signature

```ts
function debounce<T>(delay: number): OperatorFn<T>;
```
