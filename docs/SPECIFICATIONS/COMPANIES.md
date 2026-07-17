# Companies — Business Specification

## Objective
Allow multi-tenant management. Each company is an independent entity with its own configuration, users, and data.

## Actors
- Super admin (system-wide)
- Company admin (manages the company)

## Use Cases
- Register a new company (during signup)
- Update company profile (name, logo, address, tax info)
- Activate / deactivate company
- Configure company settings (currency, timezone, date format, language)
- View company usage statistics
- Delete company (soft delete, data retained for 90 days)

## Business Rules
- Company data is completely isolated from other companies.
- A company cannot be permanently deleted until 90 days after deactivation.
- Each company has its own URL subdomain or custom domain (future).
- Company settings affect all users in that company.
- Maximum users per company depends on subscription plan.

## Company Settings
| Setting | Type | Description |
|---------|------|-------------|
| currency | string | Default currency (USD, EUR, etc.) |
| timezone | string | IANA timezone (America/New_York) |
| date_format | string | DD/MM/YYYY or MM/DD/YYYY |
| language | string | en, es, fr, it |
| decimal_places | int | 2 for most currencies |
| tax_system | string | VAT, GST, Sales Tax |

## States
```
Active → Inactive (admin disables)
Inactive → Active (admin re-enables)
Active → Deleting → Deleted (soft delete + retention)
```
