# T-002 Keyword search returns matching products

Source: plan (demo suite test #3)
Goal: A shopper who searches by keyword sees only products that match it.

## Acceptance criteria

- [ ] Searching a keyword that exists in the catalog (pick one, e.g. a tool type, and say which in build notes) shows at least one result.
- [ ] Every result shown contains the keyword in its name (case-insensitive).
- [ ] Searching a nonsense keyword shows the "no results" state, not an error.
- [ ] Tagged `@smoke` for the first case, `@critical` for the no-results case.
- [ ] Follows CONVENTIONS.md; waits for the search response rather than sleeping.
- [ ] Passes 3 runs in a row locally against TARGET=baseline.

## Out of scope

- Category and price filters (T-004).
- Sorting.

## Notes

- Files likely touched: `tests/ui/search.spec.ts`
- Don't hard-code an exact result count; the catalog may change.

Status: ready   Next: Sol
