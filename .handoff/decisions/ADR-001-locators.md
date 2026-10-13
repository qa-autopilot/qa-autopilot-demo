# ADR-001: Locator strategy

Date: 2026-10-13
Status: accepted

## Decision

User-facing locators first (`getByRole`, `getByLabel`), then Toolshop's `data-test` attributes through `getByTestId`, then CSS with a comment. No XPath.

## Why

- Role and label locators break only when the user-visible behaviour changes, which is exactly when a test should be reviewed.
- Toolshop ships `data-test` attributes on most controls, so a stable fallback exists.
- The triage separates "outdated test" from "product bug" partly by which locator failed. Consistent locators make that call more reliable.
