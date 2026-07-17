# Coding Standards

> These rules are enforceable. If it can't be automated (ESLint, Checkstyle, SpotBugs), it must be reviewed manually.

---

## General Principles

1. **Readability over cleverness** — code is written once, read dozens of times.
2. **Explicit over implicit** — favor clarity over brevity.
3. **Fail fast** — validate early, throw meaningful exceptions.
4. **Single Responsibility** — each class, function, module has one reason to change.
5. **DRY, but not at the expense of clarity** — duplication is acceptable if extraction makes code harder to follow.
6. **YAGNI** — do not add abstractions "just in case."

---

## TypeScript / JavaScript

### Naming

```typescript
// ✅ Good
const userId = 42;
function formatCurrency(amount: number): string { ... }
const MAX_RETRIES = 3;

// ❌ Bad
const a = 5;                // Not descriptive
const id = params.id;       // Which id?
const data = fetchData();   // What data?
```

### Functions

```typescript
// ✅ Good — single return type, explicit
async function getProductById(id: string): Promise<Product> { ... }

// ❌ Bad — ambiguous return
async function load(id: string): Promise<any> { ... }
```

### Imports

```typescript
// ✅ Good
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/format";

// ❌ Bad
import * as React from "react";  // Use named imports
import { default as X } from "y"; // Use default import when intended
```

### React

```typescript
// ✅ Good — explicit naming, typed props
interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
}

function ProductCard({ product, onSelect }: ProductCardProps) { ... }

// ❌ Bad
function Card({ data, click }: any) { ... }
```

---

## Java

### Naming

```java
// ✅ Good
public record CreateProductRequest(String name, BigDecimal price) {}
public class ProductService { ... }
private static final Logger log = LoggerFactory.getLogger(ProductService.class);

// ❌ Bad
public class Helper { ... }
public void doStuff() { ... }
void process() { /* too generic */ }
```

### Structure

```java
// ✅ Good — constructor injection
@Service
public class ProductService {
    private final ProductRepository repository;
    private final EventPublisher publisher;

    public ProductService(ProductRepository repository, EventPublisher publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
}

// ❌ Bad — field injection
@Service
public class ProductService {
    @Autowired private ProductRepository repository;  // Field injection
}
```

### Exceptions

```java
// ✅ Good
if (product == null) {
    throw new ResourceNotFoundException("Product not found: " + productId);
}

// ❌ Bad
return null;  // Forces null checks everywhere
```

### JPA

```java
// ✅ Good — fetch join for collections
@Query("SELECT p FROM Product p LEFT JOIN FETCH p.category WHERE p.id = :id")
Optional<Product> findByIdWithCategory(@Param("id") UUID id);

// ❌ Bad — N+1 query
@OneToMany
private List<Variant> variants;  // Lazy fetch, will cause N+1
```

---

## SQL

```sql
-- ✅ Good — explicit, indexed
SELECT p.id, p.name, p.sku, s.quantity
FROM inventory.products p
JOIN inventory.stock s ON s.product_id = p.id
WHERE p.sku = 'LMW-001'
  AND p.deleted_at IS NULL;

-- ❌ Bad
SELECT * FROM products WHERE name LIKE '%search%';  -- Full scan, ambiguous column
```

---

## Git Commit Messages

```
✅ feat(inventory): add product variant management
✅ fix(sales): correct tax calculation for discounted orders
✅ refactor(crm): extract contact validation logic
✅ docs: add ADR for modular monolith decision
✅ chore: update dependencies
❌ fixed bug
❌ update
❌ wip
```

---

## ESLint / Checkstyle Rules

### TypeScript
- `no-unused-vars`: error
- `no-console`: warn (allow in development)
- `@typescript-eslint/explicit-function-return-type`: off (inferred is fine)
- `import/order`: enforce grouped imports (external → internal)

### Java (Checkstyle)
- Line length: 120 characters
- Indentation: 4 spaces (no tabs)
- One top-level class per file
- Javadoc required on public APIs only

---

## Documentation

- **Every public API** (controller endpoint, service interface, exported function) must have a doc comment explaining **what** it does (not how).
- **Complex logic** requires inline comments explaining **why** the approach was chosen.
- **Configuration** changes must be documented in the relevant docs/ file.
- **No comments** for self-documenting code (e.g., `calculateTotal()` doesn't need a comment).

---

## Quality Gates

| Gate | Tool | Threshold |
|------|------|-----------|
| Lint | ESLint | Zero errors, zero warnings |
| Format | Prettier | Auto-fix on save |
| Types | TypeScript `strict` | No `any` (exceptions documented) |
| Tests | JUnit / Vitest | Coverage > 80% |
| Build | Maven / Next.js | Must pass before merge |
| Security | SonarQube / Snyk | Zero critical/high issues |
