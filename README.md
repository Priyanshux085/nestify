# Nestify — NestJS Starter

A small NestJS-based starter application with a minimal HTTP endpoint and tests.

---

## 🚀 Overview

**Nestify** is a lightweight NestJS application scaffold that demonstrates a minimal HTTP endpoint, configuration, and end-to-end tests. It is useful as a starting point for building APIs with NestJS.

---

## 🧩 Features

- Minimal NestJS app structure (controllers, providers, main bootstrap)
- Simple configuration via `src/lib/config.ts` (supports `PORT` env var)
- End-to-end tests using Jest + Supertest
- ESLint + Prettier formatting setup

---

## ⚙️ Prerequisites

- Node.js (>= 18 recommended)
- pnpm (or npm/yarn)

---

## 🛠️ Quickstart

```bash
# install dependencies
pnpm install

# start in development mode (watch)
pnpm run start:dev

# open http://localhost:4000
```

The root route (`GET /`) returns `Hello World!` (see `src/app.controller.ts`).

---

## 📦 Scripts (examples)

- `pnpm run start` — start application
- `pnpm run start:dev` — start with watch mode
- `pnpm run build` — build TypeScript to `dist`
- `pnpm run test` — run unit tests
- `pnpm run test:e2e` — run end-to-end tests
- `pnpm run lint` — run ESLint and auto-fix
- `pnpm run format` — run Prettier to format code

(See `package.json` for full script list.)

---

## 📁 Project Structure

```
/ (project root)
├─ src/
│  ├─ main.ts           # app bootstrap
│  ├─ app.module.ts     # root module
│  ├─ app.controller.ts # example controller (GET /)
│  ├─ app.service.ts    # example service
│  └─ lib/
│     └─ config.ts      # configuration (PORT)
├─ test/                # e2e tests
├─ bruno/               # project metadata / collection
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## 🔬 Testing

Run tests with:

```bash
pnpm test
pnpm run test:e2e
```

The e2e test (`test/app.e2e-spec.ts`) validates that `GET /` returns `Hello World!`.

---

## ⚙️ Configuration

- `PORT` — port the app listens on (default: `4000`).

You can set it via environment variable before starting the app:

```bash
PORT=5000 pnpm run start:dev
```

---

## 🤝 Contributing

Contributions are welcome. Please open an issue or a pull request and follow common best practices (feature branch, tests, lint + format).

---

## 📄 License

This repository is marked **UNLICENSED** in `package.json`. If you intend to publish or share, add a license file and update `package.json` accordingly.

---

## 📫 Questions / Contact

Open an issue in this repository or contact the maintainers listed in `package.json`.
