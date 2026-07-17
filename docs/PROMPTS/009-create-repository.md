# Prompt: Create Repository

```
Create JPA repository for {entity} in the {module} module.

## Domain Port Interface
Location: com.luxury.{module}.domain.port.outbound.{Entity}Repository

Methods:
- Optional<{Entity}> findById(UUID id)
- {Entity} save({Entity} entity)
- void deleteById(UUID id)
- Page<{Entity}> findAll(Pageable pageable)

## JPA Implementation
Location: com.luxury.{module}.infrastructure.persistence.repository.Jpa{Entity}Repository

Extends: JpaRepository<{Entity}Entity, UUID>
Custom queries with @Query (JPQL, not native SQL)
Use fetch joins for relationships (avoid N+1)

## Persistence Mapper
Location: com.luxury.{module}.infrastructure.persistence.mapper.{Entity}PersistenceMapper

- Entity → Domain entity (toDomain())
- Domain entity → Entity (toEntity())

## Rules
- Domain port never exposes JPA types (Page is OK)
- Custom queries use named parameters (@Param)
- Soft delete filter: WHERE e.deleted_at IS NULL
- Use Optional, never return null
```
