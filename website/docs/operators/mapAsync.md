# mapAsync

The `mapAsync` operator transforms each value from a source into an asynchronous operation,  
returning a state-like value that tracks loading, success, or error.

---

## ✅ Basic usage

```ts
import { event } from "signux";
import { mapAsync } from "signux/operators";

const query = event<string>();
const results = query.pipe(
  mapAsync(async (term) => {
    const res = await fetch("/search?q=" + term);
    return res.json();
  }),
);
```

---

## 🔁 Result format

Each emission from `mapAsync` is an object with one of the following shapes:

```ts
{
  loading: true;
  data: never;
  error: never;
}
{
  loading: false;
  data: T;
  error: never;
}
{
  loading: false;
  data: never;
  error: E;
}
```

This pattern is compatible with `stateAsync(...)`.

---

## ⚙️ How it works

When the source emits a value:

1. `mapAsync` triggers the async function
2. It emits a `loading` state
3. Then either a `success` or `error` state

If multiple async calls are made in a row, only the **latest one is kept**.

---

## 🧩 Use cases

- Fetching suggestions from input
- Handling async side-effects in pipes
- Replacing `stateAsync()` with finer control

---

## 📦 Signature

```ts
function mapAsync<T, R>(
  fn: (value: T) => Promise<R>,
): OperatorFn<T, AsyncStateValue<R>>;
```
