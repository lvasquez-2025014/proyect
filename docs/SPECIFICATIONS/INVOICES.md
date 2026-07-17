# Invoices — Business Specification

## Objective
Manage billing and payment tracking with support for multi-jurisdiction taxes, recurring billing, and financial reconciliation.

## Actors
- Accounts receivable
- Branch manager
- Customer
- Accountant

## Use Cases
- Generate invoice from order (auto or manual)
- Create manual invoice (without order)
- Send invoice to customer (email / PDF)
- Record payment (full or partial)
- Apply credit note
- Generate credit note (for returns)
- View invoice history
- Print invoice
- Cancel invoice (if unpaid)
- Mark invoice as overdue
- Set up recurring invoice template
- View accounts receivable aging report

## Business Rules
- Invoice number is auto-generated and unique per company.
- An invoice can be generated from one order only.
- An order can have multiple invoices (partial billing).
- Invoice due date = issue date + payment terms.
- A paid invoice cannot be modified — only credited.
- An unpaid invoice can be cancelled.
- Overdue invoices trigger notifications (3, 7, 15, 30 days).
- Credit notes reduce the amount due.
- Payment can be partial — invoice shows remaining balance.
- Recurring invoices generate automatically based on schedule.

## Invoice Status Flow
```
Draft → Sent → Partially Paid → Paid
  ↓              ↓
Cancelled ← Overdue → Paid
```

## Tax Rules
| Scenario | Rule |
|----------|------|
| Single jurisdiction | Apply single tax rate to all lines |
| Multi-jurisdiction | Tax rate per line based on product/branch |
| Tax exempt | Customer has valid tax exemption certificate |
| Reverse charge | Buyer accounts for tax (B2B international) |

## Invoice Fields
| Field | Description |
|-------|-------------|
| Invoice number | Auto-generated |
| Order | UUID (optional) |
| Customer | UUID |
| Status | Enum |
| Issue date | Date |
| Due date | Date |
| Subtotal | Decimal |
| Discount | Decimal |
| Tax | Decimal |
| Total | Decimal |
| Amount paid | Decimal |
| Amount due | Decimal (computed) |
| Notes | Text |
