# T-003 Login API: token on success, 401 on bad credentials

Source: plan (demo suite test #8)
Goal: The login endpoint issues a usable token for valid credentials and refuses invalid ones.

## Acceptance criteria

- [ ] Valid customer credentials return 200 and a non-empty access token.
- [ ] The token works: a follow-up request to the authenticated "current user" endpoint returns the customer's email.
- [ ] A wrong password returns 401 and no token.
- [ ] Runs in the `api` Playwright project (no browser). Tagged `@smoke`.
- [ ] Credentials from environment variables only; the token is never logged.
- [ ] Passes 3 runs in a row against TARGET=baseline.

## Out of scope

- Token refresh, logout, registration.

## Notes

- Files likely touched: `tests/api/auth.spec.ts`
- Confirm the exact endpoint paths and response fields in the Swagger docs at the API base URL (`/api/documentation`) and record them in build notes.
- Write the login call as a small helper; T-005 will reuse it for the shared auth fixture.

Status: ready   Next: Sol
