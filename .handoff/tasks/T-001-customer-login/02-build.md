# T-001 build notes, round 1

Branch: t-001-customer-login

## What changed

- `tests/ui/login.spec.ts`: adds two `@smoke` tests using `TOOLSHOP_CUSTOMER_EMAIL` / `TOOLSHOP_CUSTOMER_PASSWORD`: valid customer login reaches `/account` with the `My account` heading; a wrong password displays `Invalid email or password` and leaves the customer on `/auth/login`.
- `.handoff/BOARD.md`: hands T-001 to Astra for review.
- Tests use isolated browser contexts, user-facing locators, business-rule assertion messages, and a response wait for the rejected login. The wrong password differs from the configured password while preserving its length, so authentication receives exactly one invalid attempt per run.
- With the owner's written approval in chat, updated the ignored local `.env` from administrator credentials to the documented seeded customer account. No credential values or environment files are included in this commit. Source: https://github.com/testsmith-io/practice-software-testing#default-accounts.

## Run evidence

- Local, TARGET=baseline: 3/3 green consecutively on the final implementation and customer configuration, 2026-10-13. Each run executed the full suite (home smoke plus both login tests), with 3 passed, 0 failed, 0 skipped and 0 retries.
- Command for each run (PowerShell): `$env:TARGET = 'baseline'; $env:CI = ''; $env:PLAYWRIGHT_BROWSERS_PATH = 'C:\Users\TUF Gaming FX505G\AppData\Local\ms-playwright'; node node_modules/@playwright/test/cli.js test --workers=1 --retries=0`.
- Run 1: 3 passed (7.5s); run 2: 3 passed (8.2s); run 3: 3 passed (7.3s).
- `npm run typecheck`: passed.
- Earlier development runs exposed an ambiguous password label locator, a wrong password exceeding form length validation, and the local account's administrator role. Corrected the locator and input generation, then corrected the local credentials with owner approval before the three consecutive green runs. No acceptance criterion changed.
- CI run: pending PR creation at handoff. The existing [PR smoke workflow](https://github.com/qa-autopilot/qa-autopilot-demo/actions/workflows/pr.yml) runs typechecking and smoke tests using CI secrets `TOOLSHOP_CUSTOMER_EMAIL` and `TOOLSHOP_CUSTOMER_PASSWORD`.
- Playwright HTML and JSON reports are available locally in the ignored `playwright-report/` and `test-results/` directories for the final run; authentication traces and credentials are not committed.

## Assertions changed or removed

none. Existing tests and assertions are unchanged; all four new assertions retain the brief's required customer login and rejection behavior.

## Open questions

- Confirm the two existing CI secrets contain customer credentials rather than administrator credentials; local validation required that correction. CI secret values were not inspected or changed.

Status: in review   Next: Astra
