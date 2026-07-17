# Prompt: Generate Documentation

```
Generate or update documentation for {module/feature}.

## Files to Update
1. SPECIFICATIONS/{module}.md — business rules, use cases
2. API/{module}.md — endpoint contracts
3. DATABASE/{table}.md — table definitions
4. UI/{page}.md — screen layouts
5. EVENTS/{module}Events.md — domain events
6. DOMAIN/{module}.md — DDD aggregates, value objects

## Process
1. Read existing code / implementation
2. Extract: business rules, API contracts, data model, UI structure
3. Format following existing document patterns
4. Cross-reference with ENGINEERING_PRINCIPLES.md and coding standards

## Rules
- Business rules go in SPECIFICATIONS/ (not technical, not implementation)
- Endpoint contracts go in API/ (request, response, errors, permissions)
- Table definitions go in DATABASE/ (columns, types, indexes, relations)
- UI specs go in UI/ (layout, components, states)
- Events go in EVENTS/ (event catalog, flows, payloads)
- Domain model goes in DOMAIN/ (aggregates, value objects, invariants)
- Do not mix concerns (no SQL in API docs, no business rules in DB docs)
```
