# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

- **Package:** `paystack-sdk` (published to npm), currently v3.9.0
- **Purpose:** Promise-based, fully typed TypeScript SDK for the [Paystack](https://paystack.com) payments REST API (`https://api.paystack.co`)
- **License:** MIT — **Author:** Tech Priest (Asaju Enitan)
- **Repository:** https://github.com/tekpriest/paystack-node
- **Runtime dependency:** only `axios` (pinned to an exact version, currently `1.16.0`). Everything else is dev tooling.

The SDK is a thin, typed wrapper over Paystack's HTTP API. It does no business logic, validation, caching, or retries of its own — it serializes typed parameters into HTTP calls and returns the API's JSON envelope.

## Commands

| Command | What it does |
|---|---|
| `npm ci` / `npm install` | Install dependencies (npm is authoritative; CI uses `npm ci`) |
| `npm run build` | Compile TypeScript with `tsc` into `dist/` (includes `.d.ts` declarations) |
| `npm test` | Run Jest (ts-jest preset) |
| `npm run lint` | ESLint 8 + `@typescript-eslint` over all `.ts` files |
| `npm run format` | `prettier --write "src/**/*.ts"` |

### Important: there are no tests

The repository currently contains **zero test files**. `npm test` exits with code 1 and "No tests found". If you add tests, place them under `__tests__/` directories or as `*.test.ts` / `*.spec.ts` files (ts-jest's default `testMatch`); they are excluded from the `tsc` build by `tsconfig.json` (`exclude: ["**/__tests__/*"]`). Adding the first test is also what would make `npm test` pass.

### npm lifecycle hooks

- `prepare` → `npm run build` (so `dist/` is built on publish; `dist/` is git-ignored)
- `prepublishOnly` → `npm run lint`
- `preversion` → format + lint + `git add -A src`
- `postversion` → `git push && git push --tags`

## Architecture

Classic **facade pattern**:

- `src/paystack.ts` defines the `Paystack` class — the single entry point users instantiate with their secret key:

  ```ts
  const paystack = new Paystack('sk_live_...');
  ```

- The constructor creates **one** shared `axios` instance:

  ```ts
  axios.create({
    baseURL: 'https://api.paystack.co',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
  });
  ```

  A response interceptor unwraps each response to `response.data`, so module methods resolve directly to the Paystack JSON envelope (`{ status, message, data }`), not the raw Axios response.

- Each Paystack API area is a **module class** in its own directory under `src/`. The `Paystack` constructor instantiates one of each, passing the shared Axios instance, and exposes it as a public property:

  | Property on `Paystack` | Directory | Class |
  |---|---|---|
  | `bulkcharge` | `src/bulkcharge/` | `BulkCharge` |
  | `charge` | `src/charge/` | `Charge` |
  | `customer` | `src/customer/` | `Customer` |
  | `dedicated` | `src/dedicated/` | `DedicatedAccount` |
  | `directDebit` | `src/directdebit/` | `DirectDebit` |
  | `dispute` | `src/dispute/` | `Dispute` |
  | `integration` | `src/integration/` | `Integration` |
  | `invoice` | `src/invoice/` | `Invoice` |
  | `misc` | `src/misc/` | `Misc` (banks, countries, states) |
  | `page` | `src/payment/` | `PaymentPage` |
  | `paymentRequest` | `src/paymentrequest/` | `PaymentRequest` |
  | `plan` | `src/plan/` | `Plan` |
  | `product` | `src/product/` | `Product` |
  | `recipient` | `src/recipient/` | `Recipient` |
  | `refund` | `src/refund/` | `Refund` |
  | `settlement` | `src/settlement/` | `Settlement` |
  | `split` | `src/split/` | `TransactionSplit` |
  | `subAccount` | `src/subaccounts/` | `SubAccount` |
  | `subscription` | `src/subscription/` | `Subscription` |
  | `terminal` | `src/terminal/` | `Terminal` |
  | `transaction` | `src/transaction/` | `Transaction` |
  | `transfer` | `src/transfer/` | `Transfer` (also exposes `transfer.control` — a nested `Control` class from `src/transfer/control.ts` for balance/OTP endpoints) |
  | `applePay` | `src/apple/` | `ApplePay` |
  | `verification` | `src/verification/` | `Verification` |
  | `virtualTerminal` | `src/virtualterminal/` | `VirtualTerminal` |

- `src/index.ts` is the package entry point: `export default Paystack` plus a **deprecated** named export `{ Paystack }` (see the ESLint rule below).

## Code Organization and Conventions

Each module directory follows the same layout:

- `interface.ts` — all request/response TypeScript types for that API area
- `<name>.ts` — the module class
- `index.ts` — re-export barrel (`export * from './interface'; export * from './<name>';`) — only present in some modules (`plan/`, `product/`, `subscription/`; `src/dedicated/index.ts` exists but is empty and unused)

Shared types live in `src/interface.ts`:

- `Meta` (pagination: `total`, `skipped`, `perPage`, `page`, `pageCount`)
- `BadRequest` and `Response` (Paystack envelope shapes)
- `QueryParams` (`perPage`, `page`, `from`, `to`) — base interface for list methods
- `Currency` union: `'NGN' | 'USD' | 'GHS' | 'ZAR' | 'KES'`

**Module class conventions** (follow these when adding endpoints):

- Constructor takes `http: Axios` and stores it as `private http: Axios`
- Methods are `async`, take typed parameters, and return `Promise<SpecificResponse | BadRequest>`
- GET with query string: `this.http.get('/path', { params: { ...queryParams } })`
- POST/PUT bodies: `this.http.post('/path', JSON.stringify(data))`
- Import shared types (`BadRequest`, `Response`, `QueryParams`, `Meta`) from `../interface`. **Newer modules do this**; a few older class files (`transaction.ts`, `transfer.ts`, `dedicated.ts`, `product.ts`, `plan.ts`, `subscription.ts`) instead declare a local `BadRequest` interface — the imported version is the convention to follow.
- Type naming: request types are named after the operation (`InitializeTransaction`, `CreateCharge`, `UpdateCustomer`); response types end in `Response`, `Created`, `Initiated`, etc. (`ListTransactionsResponse`, `TransferInitiated`). Field names inside interfaces are **snake_case** to match Paystack's JSON.
- **Amounts are in currency subunits** (kobo for NGN, pesewas for GHS, cents for ZAR). The SDK does no conversion; in several interfaces `amount` is typed as `string`.
- JSDoc comments on public methods, often with markdown headings. (Note: one existing heading in `src/transaction/transaction.ts` misspells "Transactions" as "Tansactions" — don't copy that.)

### Adding a new module

1. Create `src/<area>/interface.ts` with the request/response types, and `src/<area>/<area>.ts` with the class following the conventions above.
2. Wire it into `src/paystack.ts`: import the class, declare a `public` property, and instantiate it in the constructor with `this.http`.
3. Add the module to the README's "Supported Modules" table.

## Code Style

- **Language:** all code, comments, docs, and commit messages are in English.
- **Formatting:** Prettier 2.5.1 with `printWidth: 80`, `trailingComma: "all"`, `singleQuote: true` (see `.prettierrc`). The codebase currently passes `prettier --check`. Run `npm run format` before committing.
- **Linting:** ESLint 8.6.0 with `eslint:recommended` + `plugin:@typescript-eslint/recommended` (`.eslintrc.js`). One project-specific rule: `no-restricted-imports` warns against the named import `import { Paystack } from 'paystack-sdk'` — the default import is the supported API.
- **TypeScript:** `strict: true` but `strictNullChecks: false`, target `ES2021`, CommonJS modules, declaration files emitted to `dist/`. `tsconfig.json` compiles only `src/**/*.ts` and excludes `**/__tests__/*`.
- **Dead config:** `tslint.json` is legacy (tslint is not installed) and `jestconfig.json` is an older Jest config superseded by `jest.config.ts` (ts-jest preset, node test environment). Leave both alone unless you're removing them.
- **Lockfiles:** both `package-lock.json` and `bun.lock` are tracked; `package-lock.json` is the current one (CI uses `npm ci`). Keep `package-lock.json` in sync when changing dependencies.
- **Git history:** commits loosely follow Conventional Commits (`feat:`, `fix:`, `docs:`, `Bump ...` for dependabot PRs); version releases are committed as bare version tags (e.g. `3.9.0`) with the version bumped in `package.json`. The `CHANGELOG.md` is stale for versions after 3.6.1 — update it when cutting a release.

## Testing

- No tests exist yet. The active Jest config is `jest.config.ts` (`preset: 'ts-jest'`, `testEnvironment: 'node'`).
- When writing tests, use ts-jest default conventions (`__tests__/` or `*.test.ts` / `*.spec.ts`) so both Jest and the `tsc` build exclude rules apply.
- You can smoke-test the built SDK with `npm run build` followed by a small Node script requiring `./dist` (e.g. mock `axios` to avoid real network calls — the constructor only accepts a key string, so a fake key like `sk_test_...` works for instantiation).

## Deployment / Publishing

- Publishing ships **only `dist/**/*`** (package.json `files` field); `main` is `dist/index.js`. There is no explicit `types` field — TypeScript resolves types via the adjacent `dist/index.d.ts`.
- Release flow (intended): bump version → `preversion` formats + lints → `postversion` pushes commit and tags → `npm publish` runs `prepare` (build) and `prepublishOnly` (lint).
- **CI is currently dormant:** `.github/workflows/publish.yamld` has the extension `.yamld`, which GitHub Actions does not recognize — the workflow is not picked up. If you intend to activate CI, rename it to `.yml`. For reference, it specifies: on push to `main` → `npm ci` → `npm test` → `npm run build` → version-exists check → `npm publish --access public` using the `NPM_TOKEN` secret → create a GitHub release. Note that as written, its `npm test` step would fail today because no tests exist (see above).

## Security Considerations

- The SDK is designed for **server-side use only**. The constructor key (`sk_live_...` / `sk_test_...`) is the Paystack **secret** key and is sent as a `Bearer` token on every request. Never commit keys, log them, or ship this client to browser code.
- `.env` files are git-ignored.
- The SDK performs no validation or sanitization of inputs; Paystack's API is the validator. Keep that in mind when changing method signatures — preserving the typed contracts (`interface.ts` files) is the SDK's core value.
- The Axios instance has only the response-unwrap interceptor; errors propagate to the caller unmodified.
- The sole runtime dependency (`axios`) is pinned to an exact version and receives regular dependabot bump PRs, which the maintainer merges — keep it pinned.

## Known Issues / Gotchas

- **Bug:** `Transaction.fetch()` calls `GET /transaction/:${id}` — a literal colon in the URL (`src/transaction/transaction.ts:61`). The correct Paystack endpoint is `/transaction/{id}`. Unfixed at HEAD.
- **No tests:** `npm test` fails with "No tests found" until the first test file is added.
- **Dormant CI:** workflow file has the non-standard `.yamld` extension (see Deployment above).
- **Duplicate `BadRequest`:** several older module files define a local `BadRequest` interface instead of importing the shared one from `src/interface.ts`.
- **Deprecated named export:** `src/index.ts` still exports `{ Paystack }`; the ESLint rule pushes consumers toward the default import. The CHANGELOG shows the deprecation notice was added in 3.6.0 and removed in 3.6.1, but the named export and lint rule remain.
- `tsconfig.json` sets `strictNullChecks: false` and `checkJs: true` — be aware that "strict" is not fully strict, and don't assume full null-safety when editing.
