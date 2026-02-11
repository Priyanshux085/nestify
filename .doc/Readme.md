# Honour — Project Overview ✅

**Purpose:** Brief NestJS starter project with tests and simple app structure. This document explains how the project works and gives clear steps to add features and implement the framework.

---

## Quick prerequisites ⚙️
- Node.js (v18+ recommended)
- pnpm (repo contains `pnpm-lock.yaml`) — or use npm/yarn if you prefer
- TypeScript (included in devDependencies)

## Main structure 🔧
- `src/` — application sources
  - `main.ts` — application entry point
  - `app.module.ts` — root module (wires controllers/services)
  - `app.controller.ts`, `app.service.ts` — sample controller/service
- `test/` — e2e tests (`jest` config at `test/jest-e2e.json`)
- `bruno/` — project-specific tooling/config files (`bruno.json`, `*.bru`, `environments/`)
- `package.json` / `nest-cli.json` / `tsconfig.json` — build & CLI config

---

## How the project works (high level) 💡
- This is a NestJS application (modular architecture). `main.ts` bootstraps the Nest app.
- Modules define groups of providers (services), controllers (HTTP routes), and imports.
- Controllers receive requests, delegate logic to services. Services implement business logic and can be injected where needed.
- Tests use Jest for unit & e2e verification; `supertest` is used for HTTP integration tests.

---

## Common commands (from `package.json`) ▶️
- Install dependencies: `pnpm install`
- Start (dev): `pnpm run start:dev`
- Build: `pnpm run build`
- Start production: `pnpm run start:prod`
- Run tests: `pnpm run test`
- Run e2e tests: `pnpm run test:e2e`
- Lint & fix: `pnpm run lint`
- Format: `pnpm run format`

---

## Steps to implement the framework / add a feature (step-by-step) 🧭
1. Install dependencies: `pnpm install`.
2. Use Nest CLI to scaffold a feature (recommended):
   - `pnpm dlx nest g module <name>`
   - `pnpm dlx nest g controller <name>`
   - `pnpm dlx nest g service <name>`
3. Implement DTOs and validation:
   - Add `src/<feature>/<feature>.dto.ts` for request/response typing.
   - Use `class-validator` / `class-transformer` if you add validation.
4. Register the new module in `AppModule` (or import it in an existing module).
5. Add unit tests for services and controller tests using mocks (`*.spec.ts`).
6. Add an e2e test in `test/` that exercises the new endpoint(s).
7. Run `pnpm run test` and `pnpm run test:e2e` and fix failing tests.
8. Add linting/formatting changes with `pnpm run lint` and `pnpm run format`.
9. Build and run a production build: `pnpm run build` then `pnpm run start:prod`.
10. Commit and push changes, open a PR with a clear description and test coverage details.

---

## Environment & config notes 🌐
- Check `bruno/environments/` and `bruno/bruno.json` for project-specific configuration (this repo includes `*.bru` files used by internal tooling).
- For environment variables, follow the repo conventions (if `dotenv` or a config service is used, add `.env` as needed).

---

## Troubleshooting & tips ⚠️
- If TypeScript errors appear after cloning, run `pnpm install` and `pnpm run build`.
- For port conflicts, check which process is using the port or set a different port in `main.ts` or env.
- If tests fail, run `pnpm run test:debug` or `pnpm run test` with `--runInBand` for more deterministic output.

---

If you want, I can add examples for a sample `users` module (controller + service + tests) or include a Dockerfile and CI snippet. 💬