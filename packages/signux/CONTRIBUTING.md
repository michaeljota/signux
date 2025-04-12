# 🤝 Contributing to Signux

Thanks for your interest in contributing! Signux is a minimal and experimental reactive system for JavaScript/TypeScript.

While the library is functional and designed to be composable, it is also a personal exploration of reactive design — and we want to keep it focused and lean.

---

## ⚠️ Contribution Policy

If you'd like to propose a new feature (e.g., operator, primitive, or helper), **please open an issue first** to discuss the idea before submitting code.

We're happy to hear feedback and explore ideas, but not all proposals will be accepted — especially if they add complexity or deviate from the core design principles.

---

## 📦 Setup

Make sure you have Bun installed: https://bun.sh

```bash
git clone https://github.com/tu-usuario/signux.git
cd signux
bun install
```

---

## 🧪 Running Tests

We use Bun's built-in test runner:

```bash
bun test
```

Please ensure all tests pass before opening a PR.

---

## 🌱 Development Guidelines

- Keep the core small and composable.
- Avoid introducing magic behavior or implicit state.
- Prefer explicit types and pure functions.
- Document all public APIs using JSDoc.
- Use `@internal` to mark helpers that shouldn't appear in the public docs.

---

## ✍️ Submitting a Pull Request

1. Open an issue first if you're proposing a new idea.
2. Fork the repository.
3. Create a new branch: `feat/your-feature`, `fix/your-fix`, etc.
4. Make your changes.
5. Run and pass tests.
6. Open a PR with a clear title and description.

---

## 🙏 Code of Conduct

Please be kind, constructive, and respectful. Let's keep things friendly.

---

## 🧩 Good Contributions

- Bug fixes with minimal impact
- Documentation improvements
- New examples or guides
- Test cases for edge cases
