# POS (Point of Sale) — UI Specification

> **Note**: POS is a future feature. This spec defines the vision.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  [☰]  Luxury POS         [Branch: Madrid ▼]   [👤 Carlos]  │
├─────────────────────────────┬────────────────────────────────┤
│                             │                                │
│  ┌───────────────────────┐  │  Current Sale                  │
│  │ [🔍 Search product...] │  │                                │
│  └───────────────────────┘  │  ┌────────┬─────┬──────┬────┐ │
│                             │  │ Product│ Qty │ Price│    │ │
│  ┌─────┐ ┌─────┐ ┌─────┐  │  │ Watch  │  2  │ $900 │ [x]│ │
│  │ Cat1 │ │ Cat2 │ │ Cat3 │  │ │ Pendant│  1  │$2500 │ [x]│ │
│  └─────┘ └─────┘ └─────┘  │  │ Scarf  │  1  │ $350 │ [x]│ │
│                             │  └────────┴─────┴──────┴────┘ │
│  ┌──────┐ ┌──────┐ ┌─────┐ │                                │
│  │ Prod │ │ Prod │ │ Prod│ │  Subtotal:    $3,750           │
│  │ $450 │ │$2500 │ │$350 │ │  Discount:    -$375 (10%)      │
│  └──────┘ └──────┘ └─────┘ │  Tax (21%):    $708.75         │
│                             │  ─────────────────            │
│  ┌──────┐ ┌──────┐         │  Total:        $4,083.75      │
│  │ Prod │ │ Prod │         │                                │
│  └──────┘ └──────┘         │  [Customer ▼] [Notes ▼]       │
│                             │                                │
│                             │  [  Hold  ] [  Pay $4,083  ]  │
└─────────────────────────────┴────────────────────────────────┘
```

## Left Panel (Product Browser)
- **Search bar**: auto-focus, searches SKU/name/barcode
- **Category pills**: horizontal scrollable, filter products
- **Product grid**: 3-4 columns, product card with image + name + price
- Click product → add to cart (pick variant if needed)

## Right Panel (Cart)
- **Line items**: image thumbnail, name, quantity controls (+/-), line total, remove button
- **Quantity**: editable inline or +/- buttons
- **Discount**: click to add per-line or per-order discount
- **Customer**: search/select existing or create quick customer
- **Hold**: save current cart for later (max 10 held carts)

## Payment Modal
```
┌────────────────────────────────────┐
│  Payment           Total: $4,083   │
│                                    │
│  [Credit Card] [Cash] [Transfer]   │
│                                    │
│  Amount received: $4,100           │
│  Change: $17                       │
│                                    │
│  [Complete Sale]  [Cancel]         │
└────────────────────────────────────┘
```

## States
- **Empty cart**: illustration + "Add products to start a sale" message
- **Loading**: skeleton product grid
- **No results**: "No products found" + search suggestions
- **Error**: toast on failed payment
