# Products Table

## categories

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| name | VARCHAR(100) | NOT NULL | |
| slug | VARCHAR(120) | NOT NULL, UNIQUE (company_id) | URL-friendly name |
| description | TEXT | | |
| parent_id | UUID | FK → categories.id | Self-referencing parent |
| sort_order | INT | NOT NULL, DEFAULT 0 | Display order |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes**
- `idx_categories_parent` ON (parent_id)
- `idx_categories_slug` ON (company_id, slug) WHERE deleted_at IS NULL

---

## brands

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| name | VARCHAR(100) | NOT NULL | |
| slug | VARCHAR(120) | NOT NULL, UNIQUE (company_id) | |
| description | TEXT | | |
| logo_url | VARCHAR(500) | | |
| website | VARCHAR(500) | | |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

---

## products

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| category_id | UUID | FK → categories.id, NOT NULL | |
| brand_id | UUID | FK → brands.id | |
| sku | VARCHAR(50) | NOT NULL, UNIQUE (company_id) | Stock keeping unit |
| barcode | VARCHAR(100) | | EAN-13, UPC, etc. |
| name | VARCHAR(255) | NOT NULL | |
| description | TEXT | | Rich text |
| base_price | DECIMAL(12,2) | NOT NULL | In company currency |
| cost_price | DECIMAL(12,2) | | Weighted average cost |
| tax_rate | DECIMAL(5,4) | NOT NULL, DEFAULT 0 | e.g., 0.21 for 21% |
| unit | VARCHAR(20) | NOT NULL, DEFAULT 'unit' | unit, kg, m, pair |
| weight | DECIMAL(10,2) | | In kg |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| search_vector | TSVECTOR | | Full-text search vector (auto-updated by trigger) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes**
- `idx_products_sku` ON (company_id, sku) WHERE deleted_at IS NULL
- `idx_products_barcode` ON (barcode) WHERE deleted_at IS NULL
- `idx_products_category` ON (category_id)
- `idx_products_brand` ON (brand_id)
- `idx_products_search` GIN (search_vector)
- `idx_products_name_trgm` GIN (name gin_trgm_ops) — for fuzzy search

**Relations**
- `products.category_id` → `categories.id`
- `products.brand_id` → `brands.id`
- `products.id` ← `variants.product_id`
- `products.id` ← `stock.product_id`
- `products.id` ← `order_lines.product_id`

**Triggers**
- `trg_products_search_vector`: on INSERT/UPDATE, update `search_vector` = `to_tsvector('spanish', coalesce(name, '') || ' ' || coalesce(sku, ''))`

---

## variants

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| product_id | UUID | FK → products.id, NOT NULL | |
| sku | VARCHAR(50) | NOT NULL | |
| attributes | JSONB | NOT NULL, DEFAULT '{}' | {"color": "Black", "size": "M"} |
| price_adjustment | DECIMAL(12,2) | NOT NULL, DEFAULT 0 | +/- from base price |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| deleted_at | TIMESTAMPTZ | | |

**Constraints**
- UNIQUE (product_id, sku)
- UNIQUE (company_id, sku)

**Indexes**
- `idx_variants_product` ON (product_id)
- `idx_variants_sku` ON (company_id, sku)

---

## product_images

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| product_id | UUID | FK → products.id, NOT NULL | |
| url | VARCHAR(500) | NOT NULL | CDN URL |
| alt_text | VARCHAR(255) | | |
| width | INT | | |
| height | INT | | |
| file_size | INT | | In bytes |
| sort_order | INT | NOT NULL, DEFAULT 0 | |
| is_primary | BOOLEAN | NOT NULL, DEFAULT FALSE | Main image |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
