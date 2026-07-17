# Prompt: Create New Module

Use this prompt when creating a new ERP module (e.g., Purchasing, HR, Reports).

```
You are creating a new module called "{ModuleName}" for the Luxury ERP.

## Context
- This is a Spring Boot project at services/backend/
- Clean Architecture: domain → application → infrastructure
- Module must follow the pattern of existing modules (see inventory module)
- Database schema must be isolated (create schema {module_name})
- Frontend will be added separately

## What to create

### 1. Database Migration
Create V{date}__create_{module_name}_schema.sql in
services/backend/src/main/resources/db/migration/

Include:
- Schema creation
- All tables for the module
- Proper indexes, foreign keys, UUID PKs, audit columns
- Constraints (CHECK, UNIQUE)

### 2. Domain Layer
Create package com.luxury.{module_name}:
- domain/model/ — entities and value objects
- domain/event/ — domain events
- domain/port/inbound/ — use case interfaces
- domain/port/outbound/ — repository interfaces

### 3. Application Layer
- dto/ — request and response DTOs (records)
- service/ — application services with @Transactional
- mapper/ — MapStruct mappers

### 4. Infrastructure Layer
- persistence/entity/ — JPA entities
- persistence/repository/ — JPA repositories
- web/ — REST controllers
- web/ — module-specific exception handlers

## Business Requirements
{Domain description from SPECIFICATIONS/{module}.md}

## Rules
- Follow all patterns from existing modules
- Use constructor injection
- Use records for DTOs
- Use @Valid on request bodies
- Use @ExceptionHandler for errors
- No field injection
- No entities exposed in API (always map to DTOs)
```
