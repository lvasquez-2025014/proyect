# Modules — Luxury ERP

---

## Module Map

```
┌─────────────────────────────────────────────────────────────┐
│                      Luxury ERP                              │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Inventory │  │   CRM    │  │  Sales   │  │ Billing  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │    HR    │  │Purchasing│  │   AI     │  │  Reports │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌────────────────────────────────────────┐   │
│  │  Auth    │  │            Shared Kernel                │   │
│  └──────────┘  └────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Inventory Module

**Purpose**: Manage product catalog, stock, warehouses, and movements.

| Domain | Key Entities |
|--------|-------------|
| Product Management | `Product`, `Category`, `Brand`, `Variant` |
| Stock Control | `Stock`, `Warehouse`, `Lot`, `StockMovement` |
| Audit | `StockHistory`, `ProductAudit` |

**Events Published**:
- `ProductCreatedEvent`
- `ProductUpdatedEvent`
- `StockAdjustedEvent`
- `StockReservedEvent`
- `StockReleasedEvent`

**Events Consumed**:
- `OrderConfirmedEvent` (from Sales) → reserve stock
- `OrderCancelledEvent` (from Sales) → release stock

---

## CRM Module

**Purpose**: Manage client relationships, interactions, and segmentation.

| Domain | Key Entities |
|--------|-------------|
| Contact Management | `Contact` (individual/organization), `Address` |
| Interaction | `Interaction` (call, email, meeting, note, task) |
| Clienteling | `Wishlist`, `Preference`, `PurchaseHistoryView` |
| Segmentation | `Segment`, `SegmentRule` |

**Events Published**:
- `ContactCreatedEvent`
- `InteractionLoggedEvent`

**Events Consumed**:
- `OrderCreatedEvent` (from Sales) → update contact purchase history

---

## Sales Module

**Purpose**: Manage sales pipeline from quote to delivery.

| Domain | Key Entities |
|--------|-------------|
| Quoting | `Quote`, `QuoteLine` |
| Orders | `Order`, `OrderLine` |
| Fulfillment | `Shipment`, `Delivery` |
| Returns | `ReturnRequest`, `CreditNote` |

**Events Published**:
- `OrderCreatedEvent`
- `OrderConfirmedEvent`
- `OrderShippedEvent`
- `OrderCancelledEvent`

**Events Consumed**:
- `PaymentReceivedEvent` (from Billing) → mark order as paid

---

## Billing Module

**Purpose**: Invoicing, payment tracking, and financial reconciliation.

| Domain | Key Entities |
|--------|-------------|
| Invoicing | `Invoice`, `InvoiceLine`, `InvoiceTemplate` |
| Payments | `Payment`, `PaymentMethod` |
| Recurring | `Subscription`, `SubscriptionPlan` |
| Tax | `TaxRate`, `TaxRule` |

**Events Published**:
- `InvoiceCreatedEvent`
- `PaymentReceivedEvent`
- `InvoiceOverdueEvent`

---

## HR Module

**Purpose**: Employee management, attendance, payroll.

| Domain | Key Entities |
|--------|-------------|
| Employees | `Employee`, `Document`, `Contract` |
| Attendance | `AttendanceRecord`, `LeaveRequest` |
| Payroll | `PayrollRun`, `Payslip`, `Deduction` |
| Performance | `Review`, `Goal`, `Feedback` |

---

## Purchasing Module

**Purpose**: Supplier management and procurement.

| Domain | Key Entities |
|--------|-------------|
| Suppliers | `Supplier`, `SupplierContact`, `SupplierRating` |
| Procurement | `PurchaseOrder`, `PurchaseOrderLine` |
| Receiving | `GoodsReceivedNote` |
| Returns | `SupplierReturn` |

**Events Published**:
- `PurchaseOrderCreatedEvent`
- `GoodsReceivedEvent`

**Events Consumed**:
- `StockLowEvent` (from Inventory) → trigger reorder

---

## AI Module

**Purpose**: Machine learning features that augment other modules.

| Feature | Description | Technique |
|---------|-------------|-----------|
| Demand Forecasting | Predict future stock needs | Time series (Prophet, LSTM) |
| Client Insights | Next-best-action, churn prediction | Classification / RFM |
| Document OCR | Extract data from invoices, receipts | LayoutLM / Tesseract |
| Smart Search | Semantic search across all entities | Embeddings (OpenAI / local) |
| Anomaly Detection | Fraud, stock discrepancies | Isolation Forest / Autoencoder |

**Integration**: The AI module exposes services consumed by other modules. No UI of its own.

---

## Reports Module

**Purpose**: Dashboards, analytics, and exports.

| Feature | Description |
|---------|-------------|
| Dashboards | Role-specific (executive, manager, sales) |
| Custom Reports | Drag-and-drop report builder |
| Scheduled Reports | Email delivery (daily/weekly/monthly) |
| Exports | PDF, Excel, CSV |
| Audit Trail | All user actions logged |

---

## Auth Module

**Purpose**: Authentication, authorization, and tenant management.

| Feature | Description |
|---------|-------------|
| Login / Register | JWT-based, multi-tenant |
| Roles & Permissions | RBAC + resource-level permissions |
| Tenant Management | Company onboarding, settings |
| Audit | Login history, failed attempts |
| MFA | Time-based one-time password (TOTP) |

---

> Each module is implemented following the Clean Architecture rules defined in `02-ARCHITECTURE.md`. Module boundaries are enforced by code reviews and architecture tests.
