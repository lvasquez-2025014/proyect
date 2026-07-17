# Module Rules

## Module Boundaries

1. **A module owns its data** — only that module's services can directly access its database tables.
2. **Modules communicate via ports and events** — not by sharing database access or injecting each other's beans.
3. **Each module has a public API** — a set of interfaces (ports) that other modules can depend on.
4. **Modules publish events** — other modules subscribe to react (not to orchestrate).

## Dependency Rules

```
inventory ← sales ← billing
inventory ← purchasing
crm ← sales
crm ← billing
```

- Allowed: Module → Shared Kernel
- Allowed: Module → Module (via public ports only)
- Forbidden: Circular dependencies (A → B → A)
- Forbidden: Module → Another module's database
- Forbidden: Module → Another module's internal classes

## Module Structure (Backend)

Each module follows Clean Architecture:

```
{module}/
├── domain/
│   ├── model/          # Entities, value objects
│   ├── event/          # Domain events this module publishes
│   ├── service/        # Domain services (pure business logic)
│   └── port/           # Inbound & outbound interfaces
├── application/
│   ├── dto/            # Request/Response DTOs
│   ├── service/        # Application services (orchestration)
│   └── mapper/         # MapStruct mappers
└── infrastructure/
    ├── persistence/    # JPA entities, repositories
    └── web/            # Controllers, exception handlers
```

## Module Lifecycle

1. **Create module package** in `services/backend/src/main/java/com/luxury/{module}/`
2. **Create DB schema**: Flyway migration with `CREATE SCHEMA {module};`
3. **Define domain** — entities, value objects, events, ports
4. **Implement application** — DTOs, services, mappers
5. **Implement infrastructure** — persistence, web
6. **Wire up events** — publish domain events, subscribe to others
7. **Write tests** — unit (domain), integration (infrastructure)

## Module Testing

- Each module has its own test slice: `@ModuleTest("inventory")`
- Domain services are pure unit tests (no Spring context needed)
- Application services use `@SpringBootTest` with only the module's beans
- Integration tests use Testcontainers

## Module Registration

```java
// No special module system — package structure IS the module boundary
// ArchUnit tests enforce:
// - No classes in inventory.* import from sales.*
// - Classes in inventory.port.* are the only public API
// - Classes in inventory.domain.* do not depend on Spring

@ArchTest
static final ArchRule modules_must_not_depend_on_each_other =
    layeredArchitecture()
        .layer("Inventory").definedBy("..inventory..")
        .layer("Sales").definedBy("..sales..")
        .whereLayer("Inventory").mayNotBeAccessedByLayer("Sales");
```

## Module Discovery

When adding a new module:
1. Create an ADR if the module affects existing boundaries
2. Update `docs/14-MODULES.md` with the new module description
3. Update `docs/01-PRODUCT-REQUIREMENTS.md` with the new features
4. Create SPECIFICATIONS/{module}.md
5. Create API/{module}.md
6. Create DATABASE/{module}.md
7. Implement following the rules above
