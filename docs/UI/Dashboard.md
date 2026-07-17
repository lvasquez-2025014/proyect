# Dashboard — UI Specification

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  [Sidebar]    │                    Header                     │
│               │  [Breadcrumb]  [Search]  [Bell]  [Avatar]    │
│               ├──────────────────────────────────────────────┤
│               │                                              │
│               │   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐  │
│               │   │ KPI 1 │ │ KPI 2 │ │ KPI 3 │ │ KPI 4 │  │
│               │   └───────┘ └───────┘ └───────┘ └───────┘  │
│               │                                              │
│               │   ┌─────────────────┐ ┌─────────────────┐   │
│               │   │   Line Chart    │ │   Bar Chart     │   │
│               │   │     (60%)       │ │    (40%)        │   │
│               │   └─────────────────┘ └─────────────────┘   │
│               │                                              │
│               │   ┌──────────────────────────────────────┐  │
│               │   │         Recent Orders Table           │  │
│               │   └──────────────────────────────────────┘  │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

## Components

### KPI Card
- Icon (left), value (large, bold), label (small, muted)
- Trend indicator: green arrow up (positive), red arrow down (negative)
- Clickable → drill-down to detail view

### Line Chart
- X-axis: months
- Y-axis: amount
- Tooltip on hover: exact value + month
- Responsive: full width on desktop, scroll on mobile

### Data Table
- Columns: configurable (show/hide via dropdown)
- Sortable headers (click to sort asc/desc)
- Row hover highlight
- Pagination: Previous / Page X of Y / Next
- Bulk selection checkboxes
- Actions column: dropdown (View, Edit, Delete, Duplicate)

## Empty State
- Illustration + "No data yet" message
- CTA: "Create your first order" button

## Loading State
- Skeleton cards (pulsing gray rectangles)
- Skeleton table rows (5 rows)

## Error State
- Inline error banner at top of section
- "Try again" button
- Does not break other sections
