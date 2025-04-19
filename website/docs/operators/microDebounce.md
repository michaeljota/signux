# microDebounce

> Added in **v1.1.0**

The `microDebounce` operator emits **only the last value** from a burst of synchronous events,  
scheduled to run at the end of the current microtask.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { microDebounce } from "signux/operators";

const input = event<string>();
const stableInput = input.pipe(microDebounce());

stableInput.subscribe((value) => console.log("Stable:", value));

input("h");
input("he");
input("hel");
input("hell");
input("hello");

// Logs: "Stable: hello" — only once, at the end of the microtask
```

---

## ⚙️ How it works

It captures the latest value received in a single microtask,  
and emits only that value when the microtask queue clears.

---

## 🧩 Use cases

- Collapse multiple updates into a single emission
- Avoid duplicate reactions within the same event loop
- Clean up noisy synchronous flows

---

## 📦 Signature

```ts
function microDebounce<T>(): OperatorFn<T>;
```

---

## 🧪 Example with state

```ts
const input = state("");
const stable = input.pipe(microDebounce());
```

:::info
Note: This does not delay emissions noticeably — it's designed to debounce **within the current microtask only**.
Unlike `microThrottle`, this emits only the latest value and ignores the rest.
:::
