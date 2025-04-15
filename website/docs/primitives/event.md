---
sidebar_position: 2
---

# Event

`event<T>()`

Creates a reactive event stream that can emit values and be subscribed to.

Useful for modeling actions, user interactions, or any kind of data stream.

---

## ✅ Basic usage

```ts
import { event } from "signux";

const clicked = event<MouseEvent>();
clicked.subscribe((e) => console.log("Clicked!", e));

// emit an event
clicked(new MouseEvent("click"));
```

---

## 🧠 Events don't hold a value

Unlike state, events do not store the last value or hold any internal state.  
They are ephemeral — listeners are only notified when something is emitted.

---

## 📦 API

An `Event<T>` exposes:

- `(payload: T) => void` → emit a value
- `subscribe(fn: (value: T) => void)` → listen to emissions
- `.pipe(...operators)` → create derived reactive streams
- `.toState(initial?)` → convert the event into reactive state

---

## 🔁 With `.toState(...)`

You can convert an event into state:

```ts
const query = event<string>();
const currentQuery = query.toState("");
```

Every time `query()` is called, `currentQuery()` will update.

---

## ✍️ Example: form update

```ts
const nameChange = event<string>();
const name = nameChange.toState("Ada");

nameChange("Lovelace");
console.log(name()); // "Lovelace"
```
