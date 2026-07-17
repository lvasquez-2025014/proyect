# ADR-003: PostgreSQL over MySQL

**Status**: Accepted
**Date**: 2026-07-16

## Context
We need a relational database with strong ACID guarantees, JSON support for flexible attributes, full-text search, and analytical capabilities for reporting.

## Decision
Use PostgreSQL 16 as the primary database.

## Consequences
- + Superior JSONB for variant attributes and flexible schemas.
- + Full-text search in Spanish (required for luxury product search).
- + Window functions and CTEs for complex reporting queries.
- + Rich extension ecosystem (pgvector for AI embeddings in future).
- + Mature Flyway integration.
- - Slightly less popular in some hosting platforms vs MySQL.
- - Slightly different tooling ecosystem.

## Alternatives Considered
- **MySQL 8**: Good but JSON support is less mature, no `GENERATED ALWAYS ... STORED` as flexible, weaker full-text search in non-English languages.
- **MongoDB**: Eventual consistency is a risk for financial transactions (orders, invoices). No native JOINs required for reporting.
- **CockroachDB**: Too complex and expensive for current stage.
