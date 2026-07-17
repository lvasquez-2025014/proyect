# Branches Table

> See also: `companies.md` for the `branches` table definition, and `inventory.md` for warehouses.

## warehouses

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| branch_id | UUID | FK → branches.id, NOT NULL | Physical location |
| code | VARCHAR(20) | NOT NULL, UNIQUE (company_id) | |
| name | VARCHAR(100) | NOT NULL | |
| address_line1 | VARCHAR(255) | | |
| city | VARCHAR(100) | | |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| is_default | BOOLEAN | NOT NULL, DEFAULT FALSE | Default receiving warehouse |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes**
- `idx_warehouses_branch` ON (branch_id)
- `idx_warehouses_code` ON (company_id, code)

**Relations**
- `warehouses.id` ← `stock.warehouse_id`
- `warehouses.id` ← `stock_movements.warehouse_id`
- `warehouses.id` ← `purchase_orders.warehouse_id`

---

## branch_hours

Operating hours for branches.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| branch_id | UUID | FK → branches.id, NOT NULL | |
| day_of_week | SMALLINT | NOT NULL, CHECK (0-6) | 0=Sunday |
| open_time | TIME | | NULL = closed |
| close_time | TIME | | |
| is_closed | BOOLEAN | NOT NULL, DEFAULT FALSE | |

**Constraint**: UNIQUE (branch_id, day_of_week)
