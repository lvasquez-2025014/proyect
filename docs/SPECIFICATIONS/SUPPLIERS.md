# Suppliers — Business Specification

## Objective
Manage supplier relationships for procurement — from onboarding to performance evaluation.

## Actors
- Purchasing manager
- Warehouse operator
- Accounts payable

## Use Cases
- Create supplier (company info, contacts, payment terms)
- Edit supplier details
- Activate / deactivate supplier
- Add supplier contacts
- Add supplier addresses
- Set default payment terms
- View supplier purchase history
- Rate supplier (quality, delivery time, communication)
- View supplier performance report

## Business Rules
- Supplier tax ID (VAT, RFC, etc.) is unique per company.
- A supplier can have multiple contacts.
- Supplier rating is calculated from individual purchase orders.
- Default payment terms are inherited by purchase orders (can be overridden).
- A supplier with open purchase orders cannot be deactivated.
- Supplier data is visible to purchasing and accounting roles.

## Supplier Attributes
| Attribute | Type | Description |
|-----------|------|-------------|
| company_name | string | Legal name |
| trade_name | string | Commercial name |
| tax_id | string | VAT / RFC / Tax ID |
| email | string | Primary contact email |
| phone | string | Primary phone |
| website | string | URL |
| payment_terms | string | Net 30, Net 60, etc. |
| currency | string | Default transaction currency |
| lead_time_days | int | Average lead time |
| status | enum | Active / Inactive |

## Rating Criteria
| Criterion | Weight |
|-----------|--------|
| Product quality | 40% |
| On-time delivery | 30% |
| Communication | 15% |
| Pricing | 15% |

## States
```
Active → Inactive
Inactive → Active
```
