# Testing Strategy

## Test Pyramid

```
      ╱───────╲
     ╱  E2E   ╲        Few: critical user journeys (Cypress / Playwright)
    ╱───────────╲
   ╱ Integration ╲      Many: API, repository, controller tests (Spring Boot / Vitest)
  ╱───────────────╲
 ╱   Unit Tests    ╲    Most: domain logic, services, utilities (JUnit / Vitest)
╱───────────────────╲
```

## Frontend Testing

### Unit Tests (Vitest)
- Utility functions (formatCurrency, date formatting, validation)
- Zustand stores (state transitions, actions)
- React hooks (edge cases, loading, error states)
- Component rendering (snapshot for stable components)

### Integration Tests (Vitest + Testing Library)
- Component interactions (form submission, list filtering, modal open/close)
- API mocking (MSW — Mock Service Worker)
- User workflows (search product, add to cart, checkout)

### E2E Tests (Cypress / Playwright)
- Login → dashboard → create product → verify in list
- Create order → verify stock reserved
- Generate invoice → record payment → verify status
- Edit company settings → verify persisted

## Backend Testing

### Unit Tests (JUnit 5 + Mockito)
- Domain services (pure business logic)
- Validation logic
- Utility classes
- DTO mapping (MapStruct)

### Integration Tests (SpringBootTest + Testcontainers)
- Repository: CRUD operations, custom queries, pagination
- Controller: request/response, validation errors, auth
- Event handling: publish domain event → verify subscriber reacts
- Flyway migrations: verify schema matches entities

### Slice Tests
- `@WebMvcTest`: controller layer only
- `@DataJpaTest`: repository layer only
- `@JsonTest`: serialization only

## Coverage Targets

| Layer | Target |
|-------|--------|
| Domain | 95%+ |
| Application | 90%+ |
| Infrastructure | 80%+ |
| UI Components | 75%+ |
| E2E critical paths | 100% coverage |

## Test Naming Convention

```
{method}_{scenario}_{expectedResult}
```

Examples:
- `shouldThrowException_whenSkuAlreadyExists`
- `shouldReserveStock_whenOrderConfirmed`
- `shouldReturnError_whenNegativePrice`

## Test Data

- Use factories (Java: Builder pattern; TS: `build()` function)
- Use real DB for integration tests (Testcontainers, never H2)
- Use fixed UUIDs for deterministic tests

## CI Integration

- Unit + integration tests run on every PR
- E2E tests run nightly and on staging deploy
- Coverage reports uploaded to CI artifacts
- Tests that fail block the PR from merging
