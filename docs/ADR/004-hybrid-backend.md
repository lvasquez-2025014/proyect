# ADR-004: Hybrid Backend — Spring Boot + NestJS Services

**Status**: Proposed
**Date**: 2026-07-16

## Context
The initial architecture defined Spring Boot as the sole backend framework. However, as we analyzed the module map, certain responsibilities are better suited for a lightweight, event-driven runtime:

- **Notifications**: high I/O, multiple channels (email, SMS, push), WebSocket delivery
- **AI/ML**: async processing, external API calls (OpenAI, embeddings), potentially high CPU
- **Integrations**: webhook-heavy, third-party API orchestration, rate limiting per provider
- **Automations**: rule engines, scheduled jobs, event-driven workflows
- **WebSockets**: real-time updates (stock changes, notifications, order status)

These modules benefit from Node.js's event loop model, while the core business modules (Inventory, Sales, Billing, CRM, Identity) benefit from Spring Boot's mature transaction management, type safety, and enterprise patterns.

## Decision
Adopt a **hybrid backend architecture**:

### Core Business — Spring Boot (Java 21)
- Inventory, Sales, Billing, CRM, Purchasing, HR, Identity
- Shared Kernel (events, security, persistence, audit)
- PostgreSQL + Redis + MinIO
- REST API consumed by Next.js frontend

### Satellite Services — NestJS (Node.js + TypeScript)
- **Notifications Service** — email (Resend), SMS (Twilio), push, WebSocket gateway
- **AI Service** — LLM orchestration, embeddings, OCR processing, vector search
- **Integrations Service** — webhook management, third-party API adapters (WhatsApp, Instagram, Stripe webhooks)
- **Automations Service** — rule engine, scheduled jobs, event-driven workflows

### Communication Pattern
- **Synchronous**: REST / gRPC between services (for queries)
- **Asynchronous**: RabbitMQ / Redis Pub/Sub for events (cross-service)
- **Real-time**: WebSocket via Notifications Service (push to frontend)

```
┌──────────────────────────────────────────────────────────────────┐
│                        API Gateway (Next.js BFF)                 │
│                 Routes /api/v1/* → appropriate service           │
└──────────────────────────────────────────────────────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  Spring Boot     │   │  NestJS          │   │  NestJS          │
│  Core Business   │◄──│  Notifications   │   │  Integrations    │
│  (Inventory,     │   │  AI              │   │  Automations     │
│   Sales, Billing)│   │  (satellites)    │   │  (satellites)    │
└──────────────────┘   └──────────────────┘   └──────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  ▼
                       ┌──────────────────┐
                       │   Message Queue  │
                       │  (RabbitMQ)      │
                       └──────────────────┘
```

## Consequences
- + Each service uses the right tool for its job (Java for transactions, Node for I/O)
- + Notifications/AI/Integrations can scale independently
- + NestJS shares TypeScript types with Next.js frontend
- + WebSocket gateway in NestJS is simpler than Spring WebSocket
- - More infrastructure to manage (multiple services, message broker)
- - Higher cognitive load for developers (two frameworks)
- - Requires disciplined service boundaries to avoid fragmentation

## Implementation Plan
1. **Phase 1**: Monolith in Spring Boot (all modules). NestJS services defined but not implemented.
2. **Phase 2**: Extract Notifications Service to NestJS (first satellite, highest I/O).
3. **Phase 3**: Extract AI Service. Add message broker.
4. **Phase 4**: Extract Integrations and Automations as needed.

The key insight: the modular monolith architecture (ADR-002) already prepares us for this — modules communicate through ports and events, making extraction clean.

## Alternatives Considered
- **All Spring Boot**: Works but WebSockets and high-I/O operations are less idiomatic. Heavier deployment for notification microservices.
- **All NestJS**: Lacks mature transaction management and enterprise patterns for core financial modules.
- **All Go/Rust**: Too niche for the target developer profile. Higher hiring risk.
