# Companies Table

## companies

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | Legal company name |
| trade_name | VARCHAR(255) | | Commercial name |
| tax_id | VARCHAR(50) | UNIQUE | VAT, RFC, SIREN, etc. |
| email | VARCHAR(255) | | Primary contact email |
| phone | VARCHAR(50) | | |
| website | VARCHAR(500) | | |
| logo_url | VARCHAR(500) | | Company logo |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'active', CHECK (status IN ('active','inactive','deleting')) | |
| settings | JSONB | NOT NULL, DEFAULT '{}' | Company configuration |
| subscription_plan | VARCHAR(50) | DEFAULT 'free' | free, starter, professional, enterprise |
| max_users | INT | NOT NULL, DEFAULT 5 | |
| max_branches | INT | NOT NULL, DEFAULT 1 | |
| storage_limit_mb | INT | NOT NULL, DEFAULT 500 | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| deleted_at | TIMESTAMPTZ | | |

**Settings JSONB Structure**
```json
{
  "currency": "USD",
  "timezone": "America/New_York",
  "date_format": "MM/DD/YYYY",
  "language": "en",
  "decimal_places": 2,
  "tax_system": "VAT",
  "discount_approval_limit": 30
}
```

**Indexes**
- `idx_companies_tax_id` ON (tax_id) WHERE deleted_at IS NULL
- `idx_companies_status` ON (status)

**Relations**
- `companies.id` ← `users.company_id`
- `companies.id` ← `branches.company_id`
- `companies.id` ← `products.company_id`
- `companies.id` ← `customers.company_id`

---

## branches

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies.id, NOT NULL | |
| code | VARCHAR(20) | NOT NULL, UNIQUE (company_id) | Short identifier |
| name | VARCHAR(100) | NOT NULL | |
| type | VARCHAR(20) | NOT NULL, CHECK (type IN ('boutique','warehouse','office','online')) | |
| address_line1 | VARCHAR(255) | | |
| address_line2 | VARCHAR(255) | | |
| city | VARCHAR(100) | | |
| state | VARCHAR(100) | | |
| zip_code | VARCHAR(20) | | |
| country | VARCHAR(100) | | |
| phone | VARCHAR(50) | | |
| email | VARCHAR(255) | | |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes**
- `idx_branches_company` ON (company_id)
- `idx_branches_code` ON (company_id, code)

**Relations**
- `branches.id` ← `warehouses.branch_id`
- `branches.id` ← `user_branches.branch_id`
- `branches.id` ← `stock_movements.branch_id`
