# ADR-001: Monorepo with pnpm Workspaces

**Status**: Accepted
**Date**: 2026-07-16

## Context
We needed a repository structure that allows sharing code (TypeScript types, validation schemas, ESLint config) between frontend apps while keeping backend (Java) separate but co-located.

## Decision
Use a monorepo with pnpm workspaces.
- **Frontend**: `apps/web` (Next.js) + `packages/*` for shared TS code.
- **Backend**: `services/backend` (Spring Boot), not in pnpm workspace.
- **Root**: Orchestration scripts only (no production code).

## Consequences
- + Shared code lives in `packages/` and is versioned together.
- + Single CI pipeline for whole project.
- + Atomic commits across frontend/backend when needed.
- - Java and JS tooling co-exist but are not integrated (separate build systems).
- - Requires discipline to avoid coupling frontend and backend changes.

## Alternatives Considered
- **Separate repos**: Better isolation but harder to coordinate changes.
- **Single repo without monorepo tooling**: Works but lacks shared package management.
