# Prompt: Create New Entity

Use this when adding a new entity to an existing module.

```
Add a new entity "{EntityName}" to the {ModuleName} module.

## Context
- Module package: com.luxury.{module_name}
- Table name: {table_name}

## What to create

### 1. Database Migration
V{date}__create_{table_name}.sql
- Table with UUID PK, audit columns
- Foreign keys
- Indexes
- Constraints

### 2. Domain Entity
Add to domain/model/{EntityName}.java
- Fields (private final where possible)
- Factory method or builder
- Business methods (no getters/setters — use records or Lombok @Value)

### 3. JPA Entity
Add to infrastructure/persistence/entity/{EntityName}Entity.java
- JPA annotations
- Maps to domain entity via persistence mapper

### 4. Repository Interface
Add to domain/port/outbound/{EntityName}Repository.java
- Extend existing pattern
- Custom query methods if needed

### 5. JPA Repository
Add to infrastructure/persistence/repository/Jpa{EntityName}Repository.java
- Spring Data JPA interface

### 6. DTOs
- Create{EntityName}Request (if needed)
- {EntityName}Response

### 7. Mapper
- Update {ModuleName}Mapper with new mappings

### 8. Controller
- Add CRUD endpoints to {ModuleName}Controller (or create new one)

## Rules
- UUID primary key
- Soft delete (deleted_at)
- Audit columns (created_at, updated_at)
- Validation on all mutable fields
```
