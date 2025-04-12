# 🧩 Signux

Minimal reactive primitives for building fine-grained reactivity in JavaScript and TypeScript.  
Composable, testable, and framework-agnostic.

---

## ✨ Features

- ✅ `state`, `computed`, and `event` primitives
- ✅ `pipe(...)` for functional reactive composition
- ✅ Built-in async handling via `stateAsync` and `mapAsync`
- ✅ Small, fast, and tree-shakable
- ✅ Type-safe and JSDoc-documented

---

## 📦 Installation

```bash
bun add signux
# or
npm install signux
```

---

## 🚀 Usage

### Reactive state

```ts
import { state } from "signux";

const counter = state(0);

console.log(counter()); // 0

counter
  .on(
    { subscribe: (fn) => setInterval(() => fn(1), 1000) },
    (prev, n) => prev + n,
  )
  .create();
```

### Derived state (`computed`)

```ts
import { computed } from "signux";

const first = state("Ada");
const last = state("Lovelace");

const fullName = computed(() => \`\${first()} \${last()}\`);
console.log(fullName()); // Ada Lovelace
```

### Events

```ts
import { event } from "signux";

const click = event<MouseEvent>();
click.subscribe((e) => console.log("Clicked!", e));
```

---

## 🧪 Async support

### `stateAsync`

```ts
import { stateAsync } from "signux";

const user = stateAsync(fetchUser);
user.fetch(1);

const { loading, data, error } = user();
```

### `mapAsync` operator

```ts
import { event } from "signux";
import { mapAsync } from "signux/operators";

const search = event<string>();

const results = search.pipe(mapAsync((query) => fetchResults(query))).toState();
```

---

## 🧩 Operators

Operators are chainable transformations for events and state:

```ts
import { map, filter, debounce } from "signux/operators";

const search = event<string>();

const trimmed = search.pipe(
  map((s) => s.trim()),
  filter((s) => s.length > 2),
  debounce(300),
);
```

Available operators:

- `map`
- `filter`
- `debounce`
- `merge`
- `mapAsync`

---

## 📚 API Summary

- `state<T>()` – create mutable reactive state
- `computed<T>()` – create derived state that auto-tracks dependencies
- `event<T>()` – create an event emitter that can be observed
- `stateAsync(fetcher)` – reactive wrapper for async operations
- `.pipe(...)` – apply transformation operators
- `effect(fn)` – run a reactive side-effect

---

## 🛠 Type safety

All primitives and operators are fully typed and documented using JSDoc.  
IntelliSense works out of the box in TypeScript and modern editors.

---

## 🧼 Minimal footprint

No proxies. No magic. Just simple reactive building blocks you control.

---

## 📄 License

MIT
