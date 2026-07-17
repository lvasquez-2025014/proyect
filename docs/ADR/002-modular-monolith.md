# ADR-002: Modular Monolith (not Microservices)

**Status**: Accepted
**Date**: 2026-07-16

## Context
Early-stage ERP with limited team size. We need fast iteration, simple deployment, and the ability to refactor without distributed systems complexity.

## Decision
Build as a modular monolith on Spring Boot.
- Each domain (inventory, CRM, sales, billing) is a package-level module.
- Modules communicate via domain events and public interfaces (ports), not database sharing.
- When (if) a module needs to scale independently, it can be extracted to a separate service.

## Consequences
- + Single deployable artifact (JAR) — simple ops.
- + No network latency between modules.
- + Atomic database transactions across modules when needed.
- + Refactoring module boundaries is easy (move packages).
- - Requires architectural discipline to prevent tight coupling.
- - All modules scale together (no independent scaling).
- - A future extraction to microservices will require work.

## Alternatives Considered
- **Microservices from day one**: Too complex for current team size. Distributed transactions, service discovery, eventual consistency overhead.
- **Traditional layered monolith**: Simpler but lacks module isolation, leads to spaghetti over time.
