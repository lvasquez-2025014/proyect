# Naming Conventions

## General Rules

1. **Be descriptive, not cryptic** — `userId` not `uid`; `ProductRepository` not `ProdRepo`.
2. **Be consistent** — once you choose a pattern, apply it everywhere.
3. **Avoid abbreviations** — except for very common ones (SKU, ID, URL, DB, API, JWT).

---

## TypeScript / Frontend

| Construct | Convention | Examples |
|-----------|-----------|----------|
| Files & directories | `kebab-case` | `product-table.tsx`, `use-auth.ts` |
| React components | `PascalCase` | `ProductTable`, `StockBadge` |
| Hooks | `camelCase`, prefix `use` | `useProducts`, `useDebounce` |
| Custom hooks file | `use-{name}.ts` | `use-debounce.ts` |
| Utilities | `camelCase` | `formatCurrency`, `cn` |
| Types / Interfaces | `PascalCase`, prefix `I` for interfaces | `Product`, `IProductService` |
| Enums | `PascalCase` | `OrderStatus` |
| Enum values | `UPPER_SNAKE_CASE` | `OrderStatus.CONFIRMED` |
| CSS classes | Tailwind utilities (no custom) | `flex items-center gap-4` |
| CSS custom classes | `kebab-case` | `.product-card { ... }` |
| Zustand stores | `use{Name}Store` in `{name}-store.ts` | `useUIStore` in `ui-store.ts` |
| Route segments | `kebab-case` | `app/dashboard/inventory/products/` |
| Query keys | array of strings | `["products", { page, search }]` |
| Environment variables | `UPPER_SNAKE_CASE`, prefix `NEXT_PUBLIC_` | `NEXT_PUBLIC_API_URL` |

## Java / Backend

| Construct | Convention | Examples |
|-----------|-----------|----------|
| Classes | `PascalCase` | `ProductService`, `CreateProductRequest` |
| Methods | `camelCase` | `findBySku()`, `calculateTotal()` |
| Variables | `camelCase` | `productRepository`, `totalAmount` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Packages | `lowercase`, domain first | `com.luxury.inventory.domain` |
| Controllers | `{Resource}Controller` | `ProductController` |
| Services | `{Resource}Service` | `ProductService` |
| Repositories | `{Entity}Repository` | `ProductRepository` |
| DTOs (request) | `{Action}{Resource}Request` | `CreateProductRequest` |
| DTOs (response) | `{Resource}Response` | `ProductResponse` |
| Mappers | `{Source}Mapper` | `ProductMapper` |
| Events | `{Action}Event` | `ProductCreatedEvent` |
| Exceptions | `{Error}Exception` | `ResourceNotFoundException` |
| Flyway migrations | `V{YYYYMMDD}{seq}__{description}.sql` | `V20260716001__create_products.sql` |

## SQL / Database

| Construct | Convention | Examples |
|-----------|-----------|----------|
| Schemas | `snake_case` | `inventory`, `crm`, `sales` |
| Tables | `snake_case`, plural | `products`, `stock_movements` |
| Columns | `snake_case` | `product_id`, `unit_price` |
| Primary keys | `id` | `id UUID DEFAULT gen_random_uuid()` |
| Foreign keys | `{referenced_table_singular}_id` | `category_id`, `supplier_id` |
| Indexes | `idx_{table}_{column(s)}` | `idx_products_sku` |
| Unique constraints | `uq_{table}_{column(s)}` | `uq_products_sku` |
| Triggers | `trg_{table}_{action}` | `trg_products_search_vector` |
| Views | `v_{description}` | `v_stock_summary` |

## Git

| Construct | Convention | Examples |
|-----------|-----------|----------|
| Branches | `{type}/{ticket-id}-{description}` | `feature/PROJ-42-add-variants` |
| Commits | `{type}({scope}): {description}` | `feat(inventory): add product variants` |

## API

| Construct | Convention | Examples |
|-----------|-----------|----------|
| Endpoints | `/api/v{version}/{module}/{resource}` | `/api/v1/inventory/products` |
| Query params | `camelCase` | `?categoryId=uuid&page=0` |
| JSON fields | `snake_case` | `"product_id": "uuid"` |
| Error responses | RFC 7807 (ProblemDetail) | See API specs |
