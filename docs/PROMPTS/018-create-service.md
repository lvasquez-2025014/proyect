# Prompt: Create Service (Backend)

```
Create an application service for {entity} in the {module} module.

## Location
com.luxury.{module}.application.service.{Entity}ApplicationService

## Pattern
@Service
@Transactional
public class {Entity}ApplicationService {
    private final {Entity}Repository repository;
    private final {Entity}DomainService domainService;
    private final DomainEventPublisher eventPublisher;

    // Constructor injection

    public Page<{Entity}Response> findAll(Pageable pageable) { }
    public {Entity}Response findById(UUID id) { }
    public {Entity}Response create(Create{Entity}Request request) { }
    public {Entity}Response update(UUID id, Update{Entity}Request request) { }
    public void delete(UUID id) { }
}

## Rules
- @Transactional(readOnly = true) for queries
- @Transactional for writes
- Delegate business logic to DomainService
- Publish domain events after successful write
- Map entities to DTOs via MapStruct
- Throw ResourceNotFoundException for missing entities
- @Auditable annotation for audit logging
```
