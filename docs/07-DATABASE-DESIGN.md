# Database Design — PostgreSQL

---

## Guiding Principles

1. **Schema per module** — each module owns its schema (`inventory.*`, `crm.*`, `sales.*`).
2. **Normalize until it hurts, denormalize until it works** — start normalized, add denormalization only under proven performance need.
3. **UUIDs as primary keys** — avoids sequential ID leaks, enables safer data merging across environments.
4. **Audit columns on every table**: `created_at`, `created_by`, `updated_at`, `updated_by`.
5. **Soft delete** — use `deleted_at TIMESTAMP` (NULL = active, non-NULL = deleted).
6. **Flyway for migrations** — versioned, repeatable, never manually alter DB.

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Schemas | `snake_case` | `inventory`, `sales` |
| Tables | `snake_case`, plural | `products`, `stock_movements` |
| Columns | `snake_case` | `product_id`, `unit_price` |
| Primary keys | `id` (UUID) | `id UUID DEFAULT gen_random_uuid()` |
| Foreign keys | `{referenced_table_singular}_id` | `category_id`, `supplier_id` |
| Indexes | `idx_{table}_{column}` | `idx_products_sku` |
| Unique constraints | `uq_{table}_{column(s)}` | `uq_products_sku` |

## Schema Overview

### Inventory Schema

```sql
CREATE SCHEMA inventory;

CREATE TABLE inventory.categories (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(120) NOT NULL,
    description TEXT,
    parent_id   UUID REFERENCES inventory.categories(id),
    sort_order  INT NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at  TIMESTAMPTZ
);

CREATE TABLE inventory.brands (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    logo_url    VARCHAR(500),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE inventory.products (
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sku           VARCHAR(50) NOT NULL UNIQUE,
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    category_id   UUID NOT NULL REFERENCES inventory.categories(id),
    brand_id      UUID REFERENCES inventory.brands(id),
    base_price    DECIMAL(12,2) NOT NULL,
    cost_price    DECIMAL(12,2),
    tax_rate      DECIMAL(5,4) NOT NULL DEFAULT 0.0000,
    unit          VARCHAR(20) NOT NULL DEFAULT 'unit',
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at    TIMESTAMPTZ
);

CREATE INDEX idx_products_category ON inventory.products(category_id);
CREATE INDEX idx_products_brand ON inventory.products(brand_id);
CREATE INDEX idx_products_sku ON inventory.products(sku);
-- Full-text search index
CREATE INDEX idx_products_name_fts ON inventory.products USING GIN(to_tsvector('spanish', name));
```

### Inventory Variants & Stock

```sql
CREATE TABLE inventory.variants (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id  UUID NOT NULL REFERENCES inventory.products(id),
    sku         VARCHAR(50) NOT NULL,
    attributes  JSONB NOT NULL DEFAULT '{}',  -- e.g., {"size": "M", "color": "Red"}
    price_adjustment DECIMAL(12,2) NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(product_id, sku)
);

CREATE TABLE inventory.lots (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id      UUID NOT NULL REFERENCES inventory.products(id),
    lot_number      VARCHAR(100) NOT NULL,
    serial_numbers  TEXT[],  -- Array of serialized items
    manufacture_date DATE,
    expiry_date     DATE,
    supplier_id     UUID REFERENCES purchasing.suppliers(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE inventory.warehouses (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    code        VARCHAR(20) NOT NULL UNIQUE,
    location    VARCHAR(255),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE inventory.stock (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id   UUID NOT NULL REFERENCES inventory.products(id),
    variant_id   UUID REFERENCES inventory.variants(id),
    warehouse_id UUID NOT NULL REFERENCES inventory.warehouses(id),
    lot_id       UUID REFERENCES inventory.lots(id),
    quantity     DECIMAL(12,4) NOT NULL DEFAULT 0,
    reserved     DECIMAL(12,4) NOT NULL DEFAULT 0,
    available    DECIMAL(12,4) GENERATED ALWAYS AS (quantity - reserved) STORED,
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(product_id, variant_id, warehouse_id, lot_id)
);

CREATE TABLE inventory.stock_movements (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id      UUID NOT NULL REFERENCES inventory.products(id),
    variant_id      UUID REFERENCES inventory.variants(id),
    warehouse_id    UUID NOT NULL REFERENCES inventory.warehouses(id),
    lot_id          UUID REFERENCES inventory.lots(id),
    type            VARCHAR(20) NOT NULL CHECK (type IN ('inbound','outbound','adjustment','transfer','reservation','release')),
    quantity        DECIMAL(12,4) NOT NULL,
    reference_type  VARCHAR(50),  -- e.g., 'purchase_order', 'sale_order', 'adjustment'
    reference_id    UUID,
    notes           TEXT,
    created_by      UUID NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_movements_product ON inventory.stock_movements(product_id, created_at DESC);
CREATE INDEX idx_movements_warehouse ON inventory.stock_movements(warehouse_id);
```

### CRM Schema

```sql
CREATE SCHEMA crm;

CREATE TABLE crm.contacts (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type            VARCHAR(20) NOT NULL CHECK (type IN ('individual', 'organization')),
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    company_name    VARCHAR(255),
    email           VARCHAR(255),
    phone           VARCHAR(50),
    mobile          VARCHAR(50),
    vat_id          VARCHAR(50),
    notes           TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_contacts_email ON crm.contacts(email);
CREATE INDEX idx_contacts_name ON crm.contacts(last_name, first_name);

CREATE TABLE crm.addresses (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id  UUID NOT NULL REFERENCES crm.contacts(id),
    type        VARCHAR(20) NOT NULL CHECK (type IN ('billing', 'shipping', 'both')),
    line1       VARCHAR(255) NOT NULL,
    line2       VARCHAR(255),
    city        VARCHAR(100) NOT NULL,
    state       VARCHAR(100),
    zip_code    VARCHAR(20),
    country     VARCHAR(100) NOT NULL,
    is_primary  BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE crm.interactions (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id  UUID NOT NULL REFERENCES crm.contacts(id),
    type        VARCHAR(30) NOT NULL CHECK (type IN ('call', 'email', 'meeting', 'note', 'task')),
    subject     VARCHAR(255) NOT NULL,
    description TEXT,
    direction   VARCHAR(10) CHECK (direction IN ('inbound', 'outbound')),
    status      VARCHAR(20) DEFAULT 'completed',
    scheduled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_by  UUID NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Sales Schema

```sql
CREATE SCHEMA sales;

CREATE TYPE order_status AS ENUM ('draft', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE sales.orders (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number    VARCHAR(30) NOT NULL UNIQUE,
    contact_id      UUID NOT NULL REFERENCES crm.contacts(id),
    status          order_status NOT NULL DEFAULT 'draft',
    sub_total       DECIMAL(14,2) NOT NULL,
    tax_total       DECIMAL(14,2) NOT NULL DEFAULT 0,
    discount_total  DECIMAL(14,2) NOT NULL DEFAULT 0,
    grand_total     DECIMAL(14,2) NOT NULL,
    currency        VARCHAR(3) NOT NULL DEFAULT 'USD',
    notes           TEXT,
    created_by      UUID NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at      TIMESTAMPTZ
);

CREATE TABLE sales.order_lines (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id        UUID NOT NULL REFERENCES sales.orders(id),
    product_id      UUID NOT NULL REFERENCES inventory.products(id),
    variant_id      UUID REFERENCES inventory.variants(id),
    description     VARCHAR(500),
    quantity        DECIMAL(12,4) NOT NULL,
    unit_price      DECIMAL(12,2) NOT NULL,
    tax_rate        DECIMAL(5,4) NOT NULL DEFAULT 0.0000,
    line_total      DECIMAL(14,2) NOT NULL,
    sort_order      INT NOT NULL DEFAULT 0
);
```

### Billing Schema

```sql
CREATE SCHEMA billing;

CREATE TABLE billing.invoices (
    id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number    VARCHAR(30) NOT NULL UNIQUE,
    order_id          UUID REFERENCES sales.orders(id),
    contact_id        UUID NOT NULL REFERENCES crm.contacts(id),
    status            VARCHAR(20) NOT NULL DEFAULT 'draft'
                      CHECK (status IN ('draft','sent','paid','overdue','cancelled','refunded')),
    issue_date        DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date          DATE NOT NULL,
    sub_total         DECIMAL(14,2) NOT NULL,
    tax_total         DECIMAL(14,2) NOT NULL DEFAULT 0,
    discount_total    DECIMAL(14,2) NOT NULL DEFAULT 0,
    grand_total       DECIMAL(14,2) NOT NULL,
    amount_paid       DECIMAL(14,2) NOT NULL DEFAULT 0,
    amount_due        DECIMAL(14,2) GENERATED ALWAYS AS (grand_total - amount_paid) STORED,
    currency          VARCHAR(3) NOT NULL DEFAULT 'USD',
    notes             TEXT,
    created_by        UUID NOT NULL,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invoices_contact ON billing.invoices(contact_id);
CREATE INDEX idx_invoices_status ON billing.invoices(status);
CREATE INDEX idx_invoices_due ON billing.invoices(due_date) WHERE status NOT IN ('paid', 'cancelled');
```

### HR Schema

```sql
CREATE SCHEMA hr;

CREATE TABLE hr.employees (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_code   VARCHAR(20) NOT NULL UNIQUE,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(50),
    position        VARCHAR(100),
    department      VARCHAR(100),
    hire_date       DATE NOT NULL,
    salary          DECIMAL(12,2),
    status          VARCHAR(20) NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'inactive', 'terminated')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Flyway Migrations

### Naming Convention
- **Versioned**: `V{version}__{description}.sql` — e.g., `V20260716001__create_inventory_schema.sql`
- **Repeatable**: `R__{description}.sql` — e.g., `R__inventory_views.sql`

### Migration Example
```sql
-- V20260716001__create_inventory_schema.sql
CREATE SCHEMA inventory;
-- ... create tables as above

-- V20260716002__seed_categories.sql
INSERT INTO inventory.categories (id, name, slug, sort_order) VALUES
    (gen_random_uuid(), 'Ready-to-Wear', 'ready-to-wear', 1),
    (gen_random_uuid(), 'Accessories', 'accessories', 2),
    (gen_random_uuid(), 'Fine Jewelry', 'fine-jewelry', 3),
    (gen_random_uuid(), 'Watches', 'watches', 4),
    (gen_random_uuid(), 'Leather Goods', 'leather-goods', 5);
```

## Indexes Strategy

| Index Type | When to Use |
|-----------|-------------|
| B-tree | Default — equality and range queries |
| GIN | Full-text search, JSONB queries, arrays |
| GiST | Exclusion constraints, geometric data |
| Partial | `WHERE status != 'cancelled'` — smaller, faster |
| Covering | `INCLUDE (column)` — index-only scans |
| Composite | Multi-column filters (e.g., `(warehouse_id, product_id)`) |

## Relationships Map

```
inventory.products
  ├── category_id → inventory.categories
  ├── brand_id → inventory.brands
  ├── inventory.variants.product_id
  ├── inventory.stock.product_id
  └── inventory.lots.product_id

sales.orders
  ├── contact_id → crm.contacts
  ├── sales.order_lines.order_id → sales.orders
  └── billing.invoices.order_id → sales.orders

billing.invoices
  └── contact_id → crm.contacts
```
