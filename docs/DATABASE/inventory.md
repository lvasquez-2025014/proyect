# Inventory Tables

## stock

Tracks quantity per product+variant+warehouse+lot.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| product_id | UUID | FK → products.id, NOT NULL | |
| variant_id | UUID | FK → variants.id | NULL = no variant |
| warehouse_id | UUID | FK → warehouses.id, NOT NULL | |
| lot_id | UUID | FK → lots.id | NULL = no lot |
| quantity | DECIMAL(12,4) | NOT NULL, DEFAULT 0, CHECK (quantity >= 0) | Physical quantity |
| reserved | DECIMAL(12,4) | NOT NULL, DEFAULT 0, CHECK (reserved >= 0) | Reserved for orders |
| available | DECIMAL(12,4) | GENERATED ALWAYS AS (quantity - reserved) STORED | Computed |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Constraints**
- UNIQUE (product_id, variant_id, warehouse_id, lot_id)
- CHECK (reserved <= quantity)

**Indexes**
- `idx_stock_product` ON (product_id)
- `idx_stock_warehouse` ON (warehouse_id)
- `idx_stock_lot` ON (lot_id)
- `idx_stock_low` ON (product_id) WHERE quantity <= reorder_point (use with products table)

---

## stock_movements

Audit trail for all stock changes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| product_id | UUID | FK → products.id, NOT NULL | |
| variant_id | UUID | FK → variants.id | |
| warehouse_id | UUID | FK → warehouses.id, NOT NULL | |
| lot_id | UUID | FK → lots.id | |
| branch_id | UUID | FK → branches.id | Originating branch |
| type | VARCHAR(20) | NOT NULL, CHECK (type IN ('inbound','outbound','transfer_out','transfer_in','adjustment','reservation','release')) | |
| quantity | DECIMAL(12,4) | NOT NULL | Positive for inbound, negative for outbound |
| reference_type | VARCHAR(50) | | purchase_order, sale_order, adjustment, transfer |
| reference_id | UUID | | ID of the reference document |
| previous_quantity | DECIMAL(12,4) | | Quantity before movement |
| new_quantity | DECIMAL(12,4) | | Quantity after movement |
| reason | TEXT | | Human-readable reason |
| created_by | UUID | FK → users.id, NOT NULL | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Indexes**
- `idx_movements_product` ON (product_id, created_at DESC)
- `idx_movements_warehouse` ON (warehouse_id, created_at DESC)
- `idx_movements_type` ON (type)
- `idx_movements_reference` ON (reference_type, reference_id)
- `idx_movements_created_at` ON (created_at) — for audit queries

**Note**: Stock movements are APPEND-ONLY. Never DELETE or UPDATE.

---

## lots

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| product_id | UUID | FK → products.id, NOT NULL | |
| lot_number | VARCHAR(100) | NOT NULL | |
| serial_numbers | TEXT[] | | Array of serial numbers |
| manufacture_date | DATE | | |
| expiry_date | DATE | | |
| supplier_id | UUID | FK → suppliers.id | |
| notes | TEXT | | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Constraints**
- UNIQUE (company_id, lot_number)

**Indexes**
- `idx_lots_product` ON (product_id)
- `idx_lots_expiry` ON (expiry_date) WHERE expiry_date IS NOT NULL

---

## stock_alerts

Configurable reorder points.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| product_id | UUID | FK → products.id, NOT NULL | |
| branch_id | UUID | FK → branches.id | NULL = all branches |
| min_quantity | DECIMAL(12,4) | NOT NULL | Reorder point |
| max_quantity | DECIMAL(12,4) | | Maximum desired stock |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Constraints**
- UNIQUE (product_id, branch_id)
