# Changelog

All notable changes to this project will be documented in this file.
This project adheres to Semantic Versioning.

## [Unreleased]

### Changed

- Replace `axios` with the built-in `fetch` HTTP client (`src/http.ts`). The
  `Paystack` class now creates its shared client via `createHttpClient(key)`
  instead of `axios.create(...)`, and all module classes depend on the new
  `HttpClient` interface rather than `Axios`.

### Removed

- Drop the `axios` runtime dependency — the SDK now ships with **zero** runtime
  dependencies.

### Breaking changes

- The minimum supported Node.js version is now **18** (global `fetch`).
- Non-2xx responses now reject with `PaystackHttpError` (which exposes `.status`
  and the parsed `.body`) instead of `AxiosError`.

## 3.6.1 - 2025-12-14

### Added

- Remove deprecation notice. Add to readme

## [3.6.0] - 2025-12-14

### Added

- Added deprecation notice for default export

## 1.0.4 (2021-12-06)

### Added

* **plan:**  added methods for plan ([d68ff371](https://github.com/en1tan/paystack-node/commit/d68ff371a90b363ea087bbd5d7cfbece14ca216b))

## 1.0.3 (2021-12-06)

### Added

* **transactions:**  added initialize transaction, verify transaction, list transactions ([73c85a83](https://github.com/en1tan/paystack-node/commit/73c85a83b1ae52b4be63e3d77b8c8ff64588b8e2))
* **charge:**  compeleted the endpoints, what remains is custom validtion and comments ([cc3165ce](https://github.com/en1tan/paystack-node/commit/cc3165ce772ac574cdfbcda082ff22f67e9c8945))

## 1.0.3 (2021-12-06)

### Added

* **charge:**  compeleted the endpoints, what remains is custom validtion and comments ([cc3165ce](https://github.com/en1tan/paystack-node/commit/cc3165ce772ac574cdfbcda082ff22f67e9c8945))

- ✍🏻 UPDATE(charge): compeleted the endpoints, what remains is custom validtion and comments
- 1.0.3
- ✍🏻 UPDATE(charge): compeleted the endpoints, what remains is custom validtion and comments
- 1.0.2
- 🐞 FIX(main entry file):
- 1.0.1
- ✍🏻 UPDATE(travis): for automated builds
- 🐞 FIX(main entry file):
- 📦 NEW(set up sdk):
- Initial commit

## [Unreleased]
- Expose `bulkcharge` module
- Add `verification` module

### Added
- Automatic publish
