# Conventions

Astra reviews every change against this file. Change it only through a decision record in `decisions/`.

## Locators

1. Prefer user-facing locators: `getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`.
2. Next, Toolshop's `data-test` attributes via `getByTestId` (the config maps `testIdAttribute` to `data-test`).
3. CSS only when neither exists, and leave a one-line comment saying why.
4. Never XPath. Never `nth()` on an unstable list without a comment.

## Waiting

- No `waitForTimeout`. Rely on web-first assertions (`expect(...).toBeVisible()`) and `waitForResponse` when a test depends on an API call finishing.

## Assertions

- Every `expect` gets a message as its second argument, written as the business rule: `expect(total, 'cart total should include both items')`. The triage quotes these messages, so they must read clearly on their own.
- One behaviour per test. Several assertions are fine if they check the same behaviour.

## Test data

- Generate new users and data per run (timestamp or random suffix). Never depend on data another test created.
- Log in through the API once and reuse `storageState` for UI tests that only need a signed-in user. Test the login UI itself in the login test only.
- Credentials come from environment variables, never from code.

## Tags

| Tag | Meaning | Runs |
| --- | --- | --- |
| `@smoke` | Must-pass journeys | Every PR and nightly |
| `@critical` | Critical paths | Nightly |
| `@a11y` | Accessibility scans | Nightly |
| `@demo` | Planted behaviour for the showcase | Only when `DEMO_FLAKY=1` |

## Structure

- `tests/ui`, `tests/api`, `tests/hybrid` by layer. One file per journey: `checkout.spec.ts`.
- Page objects in `pages/` once a page is used by two or more tests. Not before.
- Test titles describe behaviour: `customer can log in with valid credentials @smoke`.

## Load on the public site

- Toolshop is shared. Keep `workers` low, no loops of repeated requests, no load testing. Use `TARGET=local` for heavy development.
