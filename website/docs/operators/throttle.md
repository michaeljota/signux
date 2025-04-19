# throttle

> Added in **v1.1.0**

The `throttle` operator limits how frequently values are emitted by introducing a delay window.  
It can emit either the **first** or **last** value in each window, depending on the mode.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { throttle } from "signux/operators";

const clicks = event<number>();
const throttled = clicks.pipe(throttle(300));

throttled.subscribe((n) => console.log("Click:", n));
```

---

## ⚙️ How it works

It enforces a time window (`delay` in milliseconds) where only one value is allowed through.  
In `"lead"` mode (_default_), the **first** value is emitted and the rest are ignored.  
In `"trail"` mode, the **last** value is saved and emitted at the end of the delay.

---

## 🧩 Use cases

- Limit frequency of events like scroll, mousemove, or keypress
- Prevent expensive computations from firing too often
- Add spacing between reactive updates

---

## 📦 Signature

```ts
function throttle<T>(delay: number, mode?: "lead" | "trail"): OperatorFn<T>;
```

---

## 🔀 Modes

| Mode               | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `"lead"` (default) | Emits the **first** value immediately and ignores the rest until the delay ends   |
| `"trail"`          | Waits until the delay ends and emits the **last** value received during that time |

---

## 🧪 Example with state

```ts
const counter = state(0);
const delayed = counter.pipe(throttle(500, "trail"));
```

:::info
Use `"lead"` mode when you want to react right away, and `"trail"` mode to wait and emit the final result.
:::
