# map

The `map` operator transforms each value from a reactive source into a new value.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { map } from "signux/operators";

const numbers = event<number>();
const doubled = numbers.pipe(map((n) => n * 2));

doubled.subscribe((n) => console.log("Doubled:", n));

numbers(3); // logs: "Doubled: 6"
```

---

## ⚙️ How it works

It subscribes to the source and calls your function for each value,  
emitting the result as a new event or computed state (depending on the source).

---

## 🧩 Use cases

- Convert values to a different format
- Extract specific fields

---

## 📦 Signature

```ts
function map<T, R>(fn: (value: T) => R): OperatorFn<T, R>;
```

---

## 🧪 Example with state

```ts
const count = state(3);
const label = count.pipe(map((n) => `Count: ${n}`));
console.log(label()); // "Count: 3"
```
