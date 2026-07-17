# Backend Guidelines — Spring Boot

---

## Module Structure (per module)

```
com.luxury.inventory/
├── domain/
│   ├── model/
│   │   ├── Product.java
│   │   └── Category.java
│   ├── event/
│   │   └── ProductCreatedEvent.java
│   ├── service/
│   │   └── ProductDomainService.java     # Stateless, pure domain logic
│   └── port/
│       ├── inbound/
│       │   └── ProductUseCase.java       # Interface for app layer
│       └── outbound/
│           ├── ProductRepository.java    # Interface
│           └── EventPublisher.java       # Interface
├── application/
│   ├── dto/
│   │   ├── CreateProductRequest.java
│   │   └── ProductResponse.java
│   ├── service/
│   │   └── ProductApplicationService.java # Orchestrates use cases
│   └── mapper/
│       └── ProductMapper.java            # MapStruct
└── infrastructure/
    ├── persistence/
    │   ├── entity/
    │   │   └── ProductEntity.java
    │   ├── mapper/
    │   │   └── ProductPersistenceMapper.java
    │   └── repository/
    │       └── JpaProductRepository.java
    └── web/
        ├── ProductController.java
        └── ProductControllerAdvice.java  # Module-specific exceptions
```

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Classes | `PascalCase` | `ProductService` |
| Methods | `camelCase` | `findByCategory` |
| Controllers | `{Resource}Controller` | `ProductController` |
| DTOs | `{Action}{Resource}{Suffix}` | `CreateProductRequest`, `ProductResponse` |
| Mappers | `{Source}{Target}Mapper` | `ProductMapper` |
| Repositories | `{Entity}Repository` | `ProductRepository` |
| Tests | `{Class}Test` | `ProductServiceTest` |

## Controller Guidelines

```java
@RestController
@RequestMapping("/api/v1/inventory/products")
public class ProductController {

    private final ProductApplicationService service;

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> list(
        @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(
        @Valid @RequestBody CreateProductRequest request
    ) {
        var product = service.create(request);
        return ResponseEntity.created(URI.create("/api/v1/inventory/products/" + product.id()))
            .body(product);
    }
}
```

## DTOs

```java
// Request — use Jakarta Validation annotations
public record CreateProductRequest(
    @NotBlank String name,
    @NotBlank String sku,
    @Positive BigDecimal price,
    @NotNull UUID categoryId,
    String description
) {}

// Response — immutable, no logic
public record ProductResponse(
    UUID id,
    String name,
    String sku,
    BigDecimal price,
    String categoryName,
    Instant createdAt,
    Instant updatedAt
) {}
```

## Services

- **Application Services**: orchestrate use cases, call domain services, publish events, manage transactions.
- **Domain Services**: stateless, pure business logic, no infrastructure concerns.
- **No @Transactional on domain services** — put it on application services.

```java
@Service
@Transactional
public class ProductApplicationService {
    private final ProductRepository repository;
    private final ProductDomainService domainService;
    private final EventPublisher eventPublisher;

    public ProductResponse create(CreateProductRequest request) {
        var product = domainService.create(request.name(), request.sku(), ...);
        var saved = repository.save(product);
        eventPublisher.publish(new ProductCreatedEvent(saved.id()));
        return ProductMapper.toResponse(saved);
    }
}
```

## Error Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        var problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problem.setTitle("Resource Not Found");
        problem.setDetail(ex.getMessage());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        var problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Validation Failed");
        problem.setProperty("errors", ex.getBindingResult()
            .getFieldErrors().stream()
            .map(e -> new FieldError(e.getField(), e.getDefaultMessage()))
            .toList());
        return problem;
    }
}
```

## Testing

- Unit tests: Domain services, mappers (JUnit 5 + Mockito).
- Integration tests: Repositories, controllers (SpringBootTest + Testcontainers).
- Slice tests: `@WebMvcTest` for controllers, `@DataJpaTest` for repositories.

```java
@SpringBootTest
@Testcontainers
class ProductRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
        .withDatabaseName("testdb");

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private ProductRepository repository;

    @Test
    void shouldSaveAndFindProduct() { ... }
}
```

## Best Practices

1. **Constructor injection only** — no `@Autowired` on fields.
2. **Use records for DTOs** — immutable, concise.
3. **Use `@Valid` on request bodies** — never manually validate in controllers.
4. **Use `@ExceptionHandler`** — never catch exceptions in controllers.
5. **Prefer `Optional` over `null`** — `repository.findById(id)` returns `Optional`.
6. **Use `@RequestMapping` on class level** — keep method mappings clean.
7. **Log at service level** — use SLF4j, structured logging.
8. **Never expose entities directly** — always map to DTOs.
