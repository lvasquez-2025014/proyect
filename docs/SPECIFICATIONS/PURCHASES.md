# Purchases — Business Specification

## Objective
Manage the procurement lifecycle from purchase order creation to goods receipt and supplier returns.

## Actors
- Purchasing manager
- Warehouse operator
- Accounts payable

## Use Cases
- Create purchase order (PO) from reorder alert
- Create purchase order manually
- Edit PO (before confirmation)
- Approve PO (if requires approval)
- Send PO to supplier (email / PDF)
- Receive goods (partial or full)
- Print PO
- Cancel PO
- Create supplier return (RMA)
- View PO history

## Business Rules
- PO number is auto-generated and unique per company.
- A PO starts in Draft status — only confirmed POs can be sent.
- POs above a configurable amount require approval.
- Goods can be received partially (multiple receipts per PO).
- Received goods automatically update inventory stock.
- Received goods cost updates the weighted average cost.
- A completed PO cannot be modified.
- A PO with partial receipt can be cancelled (remaining lines only).
- Supplier returns create a negative stock movement.

## PO Status Flow
```
Draft → Pending Approval → Confirmed → Partially Received → Completed → Cancelled
                ↓
           Rejected
```

## Purchase Order Fields
| Field | Description |
|-------|-------------|
| PO number | Auto-generated |
| Supplier | UUID |
| Branch | UUID (receiving branch) |
| Warehouse | UUID |
| Expected date | Date |
| Status | Enum |
| Subtotal | Decimal |
| Tax | Decimal |
| Total | Decimal |
| Notes | Text |
| Created by | UUID |

## Line Fields
| Field | Description |
|-------|-------------|
| Product | UUID |
| Variant | UUID (optional) |
| Quantity | Decimal |
| Unit price | Decimal |
| Received | Decimal |
| Line total | Decimal |
