# microThrottle

> Added in **v1.1.0**

The `microThrottle` operator emits **only the first value** from a burst of synchronous events,  
and ignores the rest until the microtask ends.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { microThrottle } from "signux/operators";

const input = event<string>();
const throttled = input.pipe(microThrottle());

throttled.subscribe((value) => console.log("First:", value));

input("a");
input("b");
input("c");

// Logs: "First: a"
```

---

## ⚙️ How it works

It emits the first value received, and prevents additional emissions  
until the current microtask ends using `queueMicrotask()`.

---

## 🧩 Use cases

- React immediately to the first trigger in a burst
- Suppress redundant sync emissions in a single cycle
- Avoid overprocessing during rapid updates

---

## 📦 Signature

```ts
function microThrottle<T>(): OperatorFn<T>;
```

---

## 🧪 Example with state

```ts
const count = state(0);
const throttled = count.pipe(microThrottle());
```

:::info
Unlike `microDebounce`, this emits right away and ignores the rest.
:::
