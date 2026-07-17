# Inventory — UI Specification

## Product List Page

```
┌──────────────────────────────────────────────────────────────┐
│  Products                              [+ New Product]      │
│  [Search...]  [Category ▼]  [Brand ▼]  [Status ▼]  [Filters]│
├──────────────────────────────────────────────────────────────┤
│  □ │ Image │ SKU     │ Name        │ Price  │ Stock │ Status│
│  □ │ [img] │ LMW-01 │ Watch Strap │ $450   │ 45    │ ● Act │
│  □ │ [img] │ LMW-02 │ Gold Pendant│ $2500  │ 12    │ ● Act │
│  □ │ [img] │ LMW-03 │ Silk Scarf  │ $350   │ 0     │ ○ Ina │
│                                            [1-20 of 150] ▶  │
└──────────────────────────────────────────────────────────────┘
```

### Features
- **Search**: debounced input, searches SKU + name + barcode
- **Filters**: dropdown selects for category, brand, status. "Clear all" link when filters active
- **Table**: sortable columns, row click → product detail
- **Bulk actions**: checkbox column → bulk activate/deactivate
- **Responsive**: table → card layout on mobile (image, SKU, name, price)

## Product Detail / Form

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Products           [Save] [Cancel]               │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │   Product Images    │  │   Basic Information           │  │
│  │   [Drop zone]       │  │   SKU: [_______]             │  │
│  │   [img1] [img2]     │  │   Name: [_______]            │  │
│  │                     │  │   Category: [▼ Select]       │  │
│  └─────────────────────┘  │   Brand: [▼ Select]          │  │
│                            │   Unit: [▼ Select]           │  │
│  ┌─────────────────────┐  └──────────────────────────────┘  │
│  │   Pricing            │                                    │
│  │   Base Price: [___] │  ┌──────────────────────────────┐  │
│  │   Cost Price: [___] │  │   Description                 │  │
│  │   Tax Rate: [___]   │  │   [Rich text editor...]      │  │
│  └─────────────────────┘  └──────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   Variants              [+ Add Variant]                │ │
│  │   ┌──────┬─────────┬──────────┬──────────┬────────┐  │ │
│  │   │ SKU  │ Color   │ Size     │ Price Adj│ Active │  │ │
│  │   │ MW-B │ Black   │ M        │ +$0      │ ●      │  │ │
│  │   │ MW-G │ Gold    │ M        │ +$50     │ ●      │  │ │
│  │   └──────┴─────────┴──────────┴──────────┴────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   Stock Summary               [View Detail →]          │ │
│  │   Total: 45 | Reserved: 5 | Available: 40              │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Form Validation
- SKU: required, unique, max 50 chars
- Name: required, max 255 chars
- Price: required, positive, max 2 decimals
- Tax rate: required, 0-1, 4 decimals
- Category: required

### Variant Editor
- Dynamic rows: add/remove, inline editing
- Attributes are key-value pairs (user defines attribute name)
- Price adjustment can be positive or negative

## Stock Movement History

```
┌──────────────────────────────────────────────────────────────┐
│  Stock Movements — Leather Watch Strap                      │
│  [All Types ▼]  [Date Range ▼]  [Export ▼]                 │
├──────────────────────────────────────────────────────────────┤
│  Date          │ Type     │ Qty │ Warehouse  │ User     │   │
│  2026-07-16   │ inbound  │ +20 │ Main WH    │ Carlos   │   │
│  2026-07-15   │ outbound │ -2  │ Boutique   │ Laura    │   │
│  2026-07-14   │ adjust   │ -1  │ Main WH    │ Admin    │   │
└──────────────────────────────────────────────────────────────┘
```

### Movement Detail Modal
- Type, quantity, warehouse, lot, user
- Reference document (clickable link if PO/Order)
- Reason/notes
- Previous and new quantity
