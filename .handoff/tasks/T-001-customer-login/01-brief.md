# T-001 Customer login, valid and invalid

Source: plan (demo suite test #1)
Goal: A returning customer can sign in, and a wrong password is rejected with a visible error.

## Acceptance criteria

- [ ] Test 1: customer signs in with the seeded customer account (credentials from `TOOLSHOP_CUSTOMER_EMAIL` / `TOOLSHOP_CUSTOMER_PASSWORD`) and lands on their account page; their name or "My account" is visible.
- [ ] Test 2: the same email with a wrong password shows an error message and the user stays on the login page.
- [ ] Both tests tagged `@smoke`.
- [ ] Follows CONVENTIONS.md (locators, assertion messages, no hard waits).
- [ ] Passes 3 runs in a row locally against TARGET=baseline.

## Out of scope

- Registration, password reset, social login.
- Reusable auth fixture (that comes with T-005).

## Notes

- Files likely touched: `tests/ui/login.spec.ts`
- Do not lock the shared demo account: one wrong-password attempt per run only.

Status: ready   Next: Sol
