# Product Detail — UI Specification

## Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  ← Products                   [Edit] [Duplicate] [▸ More]   │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌─────────────────────────────────────────┐  │
│  │ [IMG]    │  │  Leather Watch Strap           ● Active │  │
│  │ [IMG]    │  │  SKU: LMW-001                           │  │
│  │ [IMG]    │  │  Category: Accessories                   │  │
│  │ [IMG]    │  │  Brand: Luxury Brand                    │  │
│  │          │  │                                          │  │
│  │ [Add +]  │  │  Base Price: $450.00                    │  │
│  └──────────┘  │  Cost Price: $180.00                    │  │
│                │  Tax Rate: 21%                           │  │
│                │  Unit: unit                              │  │
│                │                                          │  │
│                │  Created: Jan 15, 2026                   │  │
│                │  Updated: Jul 16, 2026                   │  │
│                └─────────────────────────────────────────┘  │
│                                                              │
│  [Overview] [Variants] [Stock] [Movements] [History]        │
├──────────────────────────────────────────────────────────────┤
│  Tab Content (see below)                                     │
└──────────────────────────────────────────────────────────────┘
```

## Tabs

### Overview
- Full description (rich text rendered)
- Attributes table: name, value pairs

### Variants
```
┌──────┬─────────┬────────┬───────┬──────────┬────────┐
│ SKU  │ Color   │ Size   │ Price │ Stock    │ Status │
├──────┼─────────┼────────┼───────┼──────────┼────────┤
│ MW-B │ Black   │ M      │ $450  │ 20 avail │ ● Act  │
│ MW-G │ Gold    │ M      │ $500  │ 15 avail │ ● Act  │
│ MW-S │ Silver  │ M      │ $475  │ 0 avail  │ ○ Ina  │
└──────┴─────────┴────────┴───────┴──────────┴────────┘
```

### Stock
- **Summary bar**: Total: 45 | Reserved: 5 | Available: 40
- **By warehouse table**:
```
┌────────────┬──────────┬──────────┬───────────┐
│ Warehouse  │ Quantity │ Reserved │ Available │
├────────────┼──────────┼──────────┼───────────┤
│ Main WH    │ 35       │ 3        │ 32        │
│ Boutique   │ 10       │ 2        │ 8         │
└────────────┴──────────┴──────────┴───────────┘
```

### Movements
- Table of recent stock movements (last 50)
- Filter by type, date range, warehouse
- Click row → movement detail modal

### History
- Audit log of product changes
- Columns: Date, User, Field, Old value, New value
- Read-only

## Image Gallery
- Thumbnail grid: 4 columns
- Click thumbnail → lightbox view
- Drag to reorder
- Primary image marked with star badge
- Upload: drag-and-drop or file picker
- Supported: JPG, PNG, WebP (max 10MB each)

## Responsive
- Desktop: two-column layout (images left, info right)
- Tablet: stacked (images on top)
- Mobile: stacked, tabs become collapsible sections
