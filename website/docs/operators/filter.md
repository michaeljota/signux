# filter

The `filter` operator lets values through only when they pass a given test.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { filter } from "signux/operators";

const numbers = event<number>();
const even = numbers.pipe(filter((n) => n % 2 === 0));

even.subscribe((n) => console.log("Even:", n));

numbers(1); // ignored
numbers(2); // logs: "Even: 2"
```

---

## ⚙️ How it works

It subscribes to the source and applies the predicate function to every value.  
If the predicate returns `true`, the value is emitted. Otherwise, it's ignored.

---

## 🧩 Use cases

- Filter out invalid or empty values
- Skip duplicates or out-of-range numbers
- Guard emissions based on state

---

## 📦 Signature

```ts
function filter<T>(predicate: (value: T) => boolean): OperatorFn<T>;
```

---

## 🧪 Example with state

```ts
const count = state(0);
const isEven = count.pipe(filter((n) => n % 2 === 0));
```

:::info
Note: `filter()` does not suppress the state value — it only affects reactive flows like `pipe().subscribe(...)`.
:::
