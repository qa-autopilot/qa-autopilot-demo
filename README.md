# QA Autopilot demo

A nightly Playwright suite that catches a broken release overnight, labels every failure, and drafts fixes a human approves.

It runs against [Toolshop](https://practicesoftwaretesting.com), a public practice e-commerce app that ships both a clean build and a deliberately buggy build of the same release.

> **Status:** foundation in place. Critical-path tests are being built by the agent team (see `.handoff/BOARD.md`). The three-night story, live report and weekly report land here as they're finished.

## The story (coming soon)

| Night | Runs against | Result |
| --- | --- | --- |
| 1. Baseline | Clean build | All green |
| 2. Planned release | Older build → current build | UI changed on purpose → tests flagged "outdated", fix drafted and approved |
| 3. Bad deploy | Buggy build | Real defects → labelled "product bug", bug reports drafted, no test changed |

## Run it

```bash
npm install                   # first time; commit the package-lock.json it creates
npx playwright install chromium
cp .env.example .env          # add the Toolshop demo customer (see .env.example)
npm run test:smoke            # PR smoke set
npm run test:baseline         # everything, clean build
npm run test:with-bugs        # everything, the "bad deploy"
npm run report                # open the HTML report
```

The npm scripts work the same on Windows, macOS and Linux.

## How it's built

- **Playwright + TypeScript**, UI and API tests in one suite. Switch builds with `TARGET`.
- **CI**: smoke tests on every PR; nightly runs against the clean and buggy builds (coming in phase 2).
- **AI triage** (phase 3): every failure labelled product bug, outdated test, flaky, or environment, with its trace and the retry result.
- **Agent team**: a lead, a builder and a reviewer hand work to each other through numbered files in `.handoff/`. Rules in [`AGENTS.md`](AGENTS.md). A human approves every merge.

## Repo map

```
tests/         ui, api, hybrid tests
pages/         page objects (added when a page is shared)
fixtures/      targets, auth, data builders
triage/        failure triage (phase 3)
reports/       weekly reports
.handoff/      agent-team board, conventions, task folders
```

---

Built by QA Autopilot.
