# Architecture — Luxury ERP

> **Status**: Active
> **Last Updated**: 2026-07-16

---

## Guiding Principles

1. **Modular Monolith** — Start monolith, extract to services only when warranted.
2. **Clean Architecture** — Dependency inversion: domain is king, infrastructure is detail.
3. **Event-Driven** — Loose coupling through domain events (internal bus first, message broker later).
4. **API-First** — Frontend consumes REST/GraphQL; backend is built API-first.
5. **Separation of Concerns** — Each module owns its data, logic, and public contracts.

---

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Next.js │  │ Mobile   │  │ B2B API  │  │ Admin    │   │
│  │  Web App │  │ (future) │  │ Partner  │  │ Dashboard│   │
│  └────┬─────┘  └──────────┘  └────┬─────┘  └──────────┘   │
└───────┼────────────────────────────┼────────────────────────┘
        │                            │
┌───────┴────────────────────────────┴────────────────────────┐
│                   API Gateway (Next.js)                      │
│          Route /api/* → Spring Boot Backend                  │
│          Route / → Next.js SSR                              │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    Backend (Spring Boot)                     │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ inventory   │  │ crm         │  │ sales       │  ...    │
│  │ module      │  │ module      │  │ module      │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │
│  ┌──────┴────────────────┴────────────────┴──────────┐    │
│  │              Shared Kernel                          │    │
│  │  (common, security, events, persistence, etc.)     │    │
│  └──────────────────────┬─────────────────────────────┘    │
└─────────────────────────┼──────────────────────────────────┘
                          │
┌─────────────────────────┼──────────────────────────────────┐
│              Data Layer │                                   │
│  ┌──────────────────────┴──────────────┐                   │
│  │          PostgreSQL                  │                   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐        │                   │
│  │  │ inv  │ │ crm  │ │ sales│  ...   │                   │
│  │  └──────┘ └──────┘ └──────┘        │                   │
│  └─────────────────────────────────────┘                   │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │    Redis    │  │   MinIO     │                          │
│  │  (cache)    │  │  (objects)  │                          │
│  └─────────────┘  └─────────────┘                          │
└────────────────────────────────────────────────────────────┘
```

---

## Clean Architecture Layers (per module)

```
┌──────────────────────────────────┐
│         Adapters (In)            │
│  Controllers, DTOs, Validators  │
├──────────────────────────────────┤
│        Application               │
│  Use Cases, Services, Ports     │
├──────────────────────────────────┤
│         Domain                   │
│  Entities, Value Objects,       │
│  Domain Events, Repository Intf │
├──────────────────────────────────┤
│     Adapters (Out)               │
│  JPA Repositories, REST Clients, │
│  File Storage, Email            │
└──────────────────────────────────┘
```

**Dependency Rule**: Source code dependencies can only point inward. Nothing in the Domain layer can depend on anything in the outer layers.

---

## Event-Driven Architecture

### Internal (within Spring Boot)
- `DomainEventPublisher` — publishes events synchronously (via `ApplicationEventPublisher`).
- `DomainEvent` — plain Java record.
- Module subscribes to events from other modules via `@TransactionalEventListener`.

### Future (cross-service)
- RabbitMQ / Kafka for events that must be durable or cross-process.

### Example: Order Placed
```
Sales Module                   Inventory Module
┌──────────┐                   ┌──────────┐
│ Order    │─OrderPlacedEvent─>│ Reserve  │
│ Created  │                   │ Stock    │
└──────────┘                   └──────────┘
```

---

## Dependency Injection

- Spring Boot's constructor injection (no field injection).
- Modules expose public interfaces (`Ports`); implementations are in the `infrastructure` package.
- Use `@Profile` to swap implementations (e.g., `InMemoryInventoryRepository` for tests).

---

## Modular Monolith Rules

1. Modules communicate ONLY through:
   - Public interfaces (ports)
   - Domain events
   - A shared REST API (no direct bean injection across modules)
2. Each module has its own `ModuleNameApplication` test slice.
3. Circular dependencies between modules are FORBIDDEN.
4. Shared Kernel contains:
   - Base entities (e.g., `BaseEntity` with `id`, `createdAt`, `updatedAt`)
   - Common value objects (`Money`, `Email`, `Phone`, `Address`)
   - Cross-cutting concerns (security, audit, exceptions)

---

## Database per Module

Each module owns its schema:

```
inventory.products
inventory.stock_movements
crm.contacts
crm.interactions
sales.orders
sales.order_lines
```

Modules NEVER access another module's tables directly. They use the module's API or listen to its events.

---

## API Design

- RESTful endpoints: `/api/v1/{module}/{resource}`
- Pagination: `?page=0&size=20&sort=createdAt,desc`
- Error responses: consistent `ProblemDetail` (RFC 7807)
- Versioning: URL-based (`/api/v1/`)
- OpenAPI: auto-generated docs per module

---

## Frontend Architecture

- **Framework**: Next.js 14+ (App Router)
- **State**: Zustand (global) + TanStack Query (server state)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Layout**: Modular — each ERP module is a route group under `app/dashboard/{module}/` / `app/(marketing)/`

---

> This document is living. Every significant architectural change must be recorded in `docs/ADR/`.
