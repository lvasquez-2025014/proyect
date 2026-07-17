# Users Table

## users

Stores user accounts within a company.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | |
| company_id | UUID | FK → companies.id, NOT NULL | Tenant isolation |
| email | VARCHAR(255) | NOT NULL, UNIQUE (company_id, email) | Login identifier |
| password_hash | VARCHAR(255) | NOT NULL | BCrypt hash |
| first_name | VARCHAR(100) | NOT NULL | |
| last_name | VARCHAR(100) | NOT NULL | |
| phone | VARCHAR(50) | | |
| role | VARCHAR(20) | NOT NULL, CHECK (role IN ('ADMIN','MANAGER','SALES','WAREHOUSE','VIEWER')) | |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'active', CHECK (status IN ('active','inactive','pending')) | |
| last_login_at | TIMESTAMPTZ | | Last successful login |
| failed_attempts | INT | NOT NULL, DEFAULT 0 | Login attempt counter |
| locked_until | TIMESTAMPTZ | | Lockout expiration |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| deleted_at | TIMESTAMPTZ | | Soft delete |

**Indexes**
- `idx_users_company` ON (company_id)
- `idx_users_email` ON (email) WHERE deleted_at IS NULL
- `idx_users_role` ON (role)

**Relations**
- `users.company_id` → `companies.id`
- `users.id` ← `user_branches.user_id`
- `users.id` ← `stock_movements.created_by`
- `users.id` ← `orders.created_by`

---

## user_branches

Maps users to branches (many-to-many).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | UUID | PK, FK → users.id | |
| branch_id | UUID | PK, FK → branches.id | |
| is_default | BOOLEAN | NOT NULL, DEFAULT FALSE | Default branch for the user |

---

## refresh_tokens

Stores JWT refresh tokens.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, NOT NULL | |
| token_hash | VARCHAR(255) | NOT NULL, UNIQUE | SHA-256 hash of refresh token |
| expires_at | TIMESTAMPTZ | NOT NULL | |
| revoked | BOOLEAN | NOT NULL, DEFAULT FALSE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Indexes**
- `idx_refresh_tokens_user` ON (user_id)
- `idx_refresh_tokens_hash` ON (token_hash)
