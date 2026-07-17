# Prompt: Generate Seed Data

```
Generate seed data for {module} testing/development.

## Location
services/backend/src/main/resources/db/migration/R__seed_{module}.sql

## Format
INSERT INTO {schema}.{table} (id, company_id, name, ...) VALUES
    (gen_random_uuid(), 'fixed-uuid-company', 'Sample 1', ...),
    (gen_random_uuid(), 'fixed-uuid-company', 'Sample 2', ...);

## Guidelines
- Use fixed UUIDs for reference data (categories, brands)
- Minimum 5 records per entity
- Realistic luxury-brand sample data (not "Item 1", "Item 2")
- Multi-language where applicable
- Include edge cases (inactive, deleted, etc.)

## Categories Example
INSERT INTO inventory.categories (id, company_id, name, slug, sort_order) VALUES
    ('a1b2c3d4-...', 'fixed-company', 'Ready-to-Wear', 'ready-to-wear', 1),
    ('b2c3d4e5-...', 'fixed-company', 'Accessories', 'accessories', 2);

## Rules
- Repeatable migration (R__ prefix, run after versioned migrations)
- Idempotent (DELETE + INSERT or INSERT ... ON CONFLICT DO NOTHING)
- Test data is deterministic (same UUIDs every run)
- No sensitive or real customer data
```
