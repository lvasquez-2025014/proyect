# Prompt: Create Test

```
Create tests for {entity} in the {module} module.

## Unit Test (Domain Service)
Location: src/test/java/com/luxury/{module}/domain/{Entity}DomainServiceTest.java

- Pure JUnit 5 (no Spring context)
- Mock dependencies with Mockito
- Test: creation, validation rules, edge cases, error conditions
- Naming: {method}_{scenario}_{expectedResult}

## Integration Test (Repository)
Location: src/test/java/com/luxury/{module}/infrastructure/persistence/{Entity}RepositoryTest.java

- @DataJpaTest + Testcontainers
- Test: CRUD, custom queries, pagination, constraints
- Use real PostgreSQL (not H2)

## Integration Test (Controller)
Location: src/test/java/com/luxury/{module}/infrastructure/web/{Entity}ControllerTest.java

- @WebMvcTest or @SpringBootTest
- Test: HTTP status codes, response body, validation errors
- Mock service layer

## Example Structure
@SpringBootTest
@Testcontainers
class {Entity}RepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void shouldSaveAndFindById() { }

    @Test
    void shouldThrowException_whenSkuNotUnique() { }
}

## Coverage Targets
- Domain: 100%
- Application: 90%
- Infrastructure: 80%
```
