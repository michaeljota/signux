# 🧩 Signux

**Signux** is an experimental reactive system for JavaScript and TypeScript — fine-grained, composable, and framework-agnostic.

This is the main monorepo containing the source code, documentation, and test suite.

---

## 📦 Packages & structure

| Folder            | Description                         |
| ----------------- | ----------------------------------- |
| `packages/signux` | Core library source code            |
| `website/`        | Docusaurus-based documentation site |

---

## 🛠 Getting started

Install dependencies:

```bash
bun install
```

Run tests:

```bash
bun test
```

Start documentation dev server:

```bash
cd website
bun run start
```

---

## 📚 Documentation

The full documentation is available at:

👉 [https://michaeljota.github.io/signux](https://michaeljota.github.io/signux)

---

## 🤔 What is Signux?

Signux is an experimental reactive library.

The goal is to explore how **reactive primitives** can replace traditional state management patterns, especially in functional systems. It's small, explicit, and built for composition.

---

## 🤝 Contributing

If you want to open a PR, please:

- Use `bun test` to ensure everything passes
- Document public APIs with JSDoc
- Open an issue before proposing large additions or design changes

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

## 📄 License

MIT © [michaeljota](https://github.com/michaeljota)
