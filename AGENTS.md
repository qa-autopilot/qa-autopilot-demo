# Agent team rules

This repo is built by a small team of AI agents with one human owner.
Every agent reads this file and `.handoff/CONVENTIONS.md` before starting work.

## Roles

| Agent | Owns | Never does |
| --- | --- | --- |
| **Claude (lead)** | Writes task briefs with acceptance criteria, classifies triage failures, writes the decision note for the owner | Writes the test code for a task it briefed |
| **Codex Sol (builder)** | Implements one brief on its own branch, runs the suite, writes build notes with evidence | Changes acceptance criteria or weakens an assertion |
| **Codex Astra (reviewer)** | Reviews the diff and run evidence against the brief and CONVENTIONS.md | Fixes the code itself |
| **Owner (human)** | Approves or rejects, merges, talks to clients | — |

## How work moves

1. Find your next task in `.handoff/BOARD.md`: the row where `Next` is your name.
2. Open that task's folder in `.handoff/tasks/` and read every file in order.
3. Do your part. Write **one new numbered file** using the matching template in `.handoff/templates/`.
4. End the file with `Status:` and `Next:`. Update that task's row in `BOARD.md` to match.
5. Stop. Do not start the next agent's part.

## Hard rules

- Only the agent named in the last file's `Next:` line may write next.
- Files in `.handoff/` are append-only. Never edit another agent's file; write a new numbered file instead.
- At most two review rounds. After round two, the lead splits the task or decides.
- A failure classified as a **product bug** never becomes a test change. It becomes a bug report.
- Never delete a test, skip it, or loosen an assertion to make CI green without the owner's written approval in a decision file.
- Never merge to `main`. Only the owner merges.
- No secrets, tokens, passwords or client data in any committed file. Refer to CI secrets by name.

## Branches

- One branch per task: `t-<number>-<short-slug>`, e.g. `t-001-customer-login`.
- Commits reference the task: `T-001: add customer login test`.
