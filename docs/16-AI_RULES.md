# AI Rules — for DeepSeek / Cursor / Copilot

> This file defines explicit constraints for AI coding assistants working on this project. These rules are mandatory.

---

## Golden Rules

1. **Never create monolithic components.** A component > 300 lines must be refactored.
2. **Never duplicate code.** If you use the same pattern twice, extract it.
3. **Never change the architecture** without an ADR. The modular monolith structure is fixed.
4. **Always re-use existing utilities.** Check `lib/`, `shared/`, and `packages/` before writing new code.
5. **Never install a dependency without justifying why** in a comment or PR description.
6. **Never delete directories or files** unless explicitly instructed.
7. **Never modify public APIs** (controller signatures, DTOs, database columns) without updating all consumers.
8. **Always document your changes** — update the relevant `docs/` file.
9. **Follow the existing patterns** in the file you're editing. Consistency > personal preference.
10. **Never hardcode secrets, tokens, or URLs** — use environment variables.

---

## Code Generation Rules

### TypeScript / React

- Prefer server components (`"use client"` is an escape hatch, not the default).
- Use `z.infer<typeof schema>` for form types, not manual interfaces.
- Use `fetch` with the shared `api` client — never raw `fetch` in components.
- Use `useQuery` / `useMutation` from TanStack Query for all server data.
- Use Zustand only for UI state (sidebar, theme, modals), not server data.
- Every new feature needs an `error.tsx` and `loading.tsx` at the route level.

### Java / Spring Boot

- Every module follows the same package structure: `domain/`, `application/`, `infrastructure/`.
- Use constructor injection, never `@Autowired`.
- Use records for DTOs (Java 16+).
- Use MapStruct for entity↔DTO mapping.
- Use `@Valid` on all request bodies.
- Use `@ExceptionHandler` for errors, never try-catch in controllers.
- Use `@Transactional` only at the application service level.

### Database

- Every migration is a new file — never alter existing migrations.
- Every table has: `id`, `created_at`, `updated_at`, `deleted_at` (soft delete).
- Use `UUID` primary keys, never auto-increment integers.
- Use `TIMESTAMPTZ` for timestamps, never `TIMESTAMP` or `DATETIME`.
- Use `DECIMAL` for monetary values, never `FLOAT` or `DOUBLE`.

---

## Architecture Rules

1. **Module isolation**: Modules communicate through interfaces and events, not direct bean access.
2. **Schema isolation**: Each module owns its DB schema. Cross-schema queries are forbidden.
3. **Clean Architecture**: Domain layer has zero dependencies on frameworks or infrastructure.
4. **API versioning**: `/api/v1/` prefix. Breaking changes = new version.
5. **No circular dependencies** between modules (enforced by ArchUnit tests).

---

## Quality Rules

1. **Every PR must pass CI** — lint, typecheck, test, build.
2. **Test coverage > 80%** for new code.
3. **No `any` types in TypeScript** — use `unknown` if you must, but prefer specific types.
4. **No `System.out.println` or `console.log`** in committed code (use proper logging).
5. **No TODO or FIXME** without a linked ticket number.

---

## When in Doubt

1. Read the existing code in the same area — follow the patterns.
2. Check `docs/` for guidelines.
3. Ask: "Does this change need an ADR?" If yes, create one in `docs/ADR/`.
4. When refactoring: change one thing at a time. Never mix refactoring with feature work.

---

> These rules are enforced by AI review. Repeated violations will be flagged.
