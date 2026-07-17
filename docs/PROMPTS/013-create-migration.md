# Prompt: Create Migration

```
Create a Flyway migration for {description}.

## Location
services/backend/src/main/resources/db/migration/V{YYYYMMDDHHMMSS}__{description}.sql

## Naming Convention
V{date}__{kebab-case-description}.sql
Example: V20260716001__create_inventory_schema.sql

## Content Guidelines
- Use CREATE SCHEMA for new modules
- UUID primary keys with DEFAULT gen_random_uuid()
- TIMESTAMPTZ for timestamps (never TIMESTAMP or DATETIME)
- DECIMAL for monetary values (never FLOAT or DOUBLE)
- Audit columns: created_at, updated_at, deleted_at (soft delete)
- Comments on tables and columns for documentation
- Indexes on foreign keys and frequently queried columns
- CHECK constraints for enum-like columns

## Rules
- Always idempotent when possible (IF NOT EXISTS)
- Versioned migrations only (V prefix)
- Never modify an existing migration — create a new one
- Test with Flyway migrate + repair before committing
```
