---
sidebar_position: 5
---

# State Async

`stateAsync<T, P = void>(fetcher: (params: P) => Promise<T>)`

Creates a reactive state for managing asynchronous operations.  
It wraps a `fetcher` function and tracks its state: loading, success or error.

---

## ✅ Basic usage

```ts
import { stateAsync } from "signux";

const user = stateAsync((id: number) =>
  fetch(`/api/users/${id}`).then((res) => res.json()),
);

user.fetch(1);

const { loading, data, error } = user();
```

---

## 🔁 States

A `stateAsync<T>` always returns one of three states:

```ts
type AsyncStateValue<T> =
  | { loading: true; data: never; error: never }
  | { loading: false; data: T; error: never }
  | { loading: false; data: never; error: Error };
```

---

## 🔄 Only latest result is applied

If multiple `.fetch(...)` calls happen in a row, **only the latest one will update the state.**  
Previous results will be ignored if they resolve after the most recent one.

---

## 📦 API

A `StateAsync<T>` exposes:

- `(): AsyncStateValue<T>` → get the current state
- `subscribe(fn)` → listen to state changes
- `.fetch(params)` → trigger the async operation

---

## ✍️ Example

```ts
const search = stateAsync(async (q: string) => {
  const res = await fetch("/api?q=" + q);
  return res.json();
});

search.fetch("hello");

const { loading, data } = search();
```
