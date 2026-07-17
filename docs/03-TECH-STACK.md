# Tech Stack & Rationale

---

## Frontend

| Technology | Purpose | Why |
|-----------|---------|-----|
| **Next.js 14** | Web framework | SSR for SEO (landing), RSC for performance, App Router for nested layouts, API routes for BFF pattern |
| **TypeScript** | Language | Type safety, better DX, catch errors at compile time |
| **Tailwind CSS** | Styling | Utility-first, rapid prototyping, consistent design system, tiny production bundles |
| **shadcn/ui** | Component library | Copy-paste, fully customizable, no dependency lock-in, Radix-based accessibility |
| **Zustand** | State management | Minimal boilerplate, no providers, works outside React, persists to localStorage |
| **TanStack Query** | Server state | Cache, deduplication, optimistic updates, stale-while-revalidate, pagination |
| **React Hook Form + Zod** | Forms | Performant (uncontrolled), schema-based validation, minimal re-renders |
| **Zod** | Validation | Runtime type validation, shared schemas with backend if using tRPC (future) |

## Backend

| Technology | Purpose | Why |
|-----------|---------|-----|
| **Spring Boot 3** | Backend framework | Mature ecosystem, excellent for modular monoliths, strong typing, DI, AOP |
| **Java 21** | Language | LTS, virtual threads (project loom), pattern matching, records, sealed classes |
| **Spring Data JPA** | ORM | Declarative repositories, entity lifecycle, auditing, SpEL queries |
| **Flyway** | DB migrations | Versioned, repeatable, schema history table, integrates with Spring Boot |
| **Spring Security** | AuthN/AuthZ | JWT support, method security, OAuth2 ready |
| **Spring Validation** | Validation | Bean Validation (Jakarta), groups, custom validators |
| **Lombok** | Boilerplate | `@Data`, `@Builder`, `@Value` — reduces Java verbosity (used responsibly) |
| **MapStruct** | Mapping | Compile-time DTO/entity mapping, no reflection overhead |
| **Testcontainers** | Integration testing | Real DB in tests, Flyway migrations, no mocking of DB |

## Data & Cache

| Technology | Purpose | Why |
|-----------|---------|-----|
| **PostgreSQL 16** | Primary DB | JSONB, full-text search, window functions, CTEs, strong ACID, excellent extension ecosystem |
| **Redis** | Cache / Session store | Sub-millisecond reads, TTL-based invalidation, distributed locks, rate limiting |

## Infrastructure & DevOps

| Technology | Purpose | Why |
|-----------|---------|-----|
| **Docker** | Containerization | Consistent environments, CI/CD parity, local dev with compose |
| **Docker Compose** | Local dev | Postgres + Redis + app, one command to start |
| **GitHub Actions** | CI/CD | Tight GitHub integration, matrix builds, self-hosted runners option |
| **Vercel** | Frontend hosting | Next.js optimized, edge functions, automatic SSL, preview deployments |
| **Render** | Backend hosting | Managed Postgres, auto-deploy from GitHub, Docker support |

## Monitoring & Observability

| Technology | Purpose | Why |
|-----------|---------|-----|
| **Sentry** | Error tracking | Real-time exception monitoring, performance traces |
| **Grafana + Prometheus** | Metrics | Custom dashboards, Spring Boot Actuator metrics, business KPIs |
| **Loki** | Logging | Aggregated logs, Grafana integration, cheap storage |

---

## Why NOT other options?

| Not chosen | Reason |
|-----------|--------|
| **Microservices** | Added complexity not yet justified; modular monolith is faster to develop, easier to refactor |
| **MySQL** | PostgreSQL has better JSON support, more analytical features, better extension story |
| **MongoDB** | We need ACID transactions and relational integrity for financial data |
| **Angular / Vue** | Next.js gives us React ecosystem + SSR + SEO in one framework |
| **NestJS** | Spring Boot is more mature for complex enterprise domains; Java's ecosystem is better suited |
| **Kubernetes** | Overkill for early stage; simpler hosting (Render) is more cost-effective |

---

> Decisions documented here are revisited quarterly. Any change requires an ADR.
