# merge

The `merge` operator combines multiple reactive sources into a single stream.

Every time either source emits, the merged stream emits that value.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { merge } from "signux/operators";

const a = event<string>();
const b = event<number>();

const mixed = a.pipe(merge(b));

mixed.subscribe((value) => console.log("Received:", value));

a("hello"); // logs: "Received: hello"
b(42); // logs: "Received: 42"
```

---

## ⚙️ How it works

It listens to both the original source and the `other` subscribable.  
Any time either one emits, the value is forwarded to the result.

---

## 🧩 Use cases

- Combine UI events with external triggers
- Unify multiple streams into one
- Create global "any change" signals

---

## 📦 Signature

```ts
function merge<O>(other: Subscribable<O>): OperatorFn<any, O | any>;
```
