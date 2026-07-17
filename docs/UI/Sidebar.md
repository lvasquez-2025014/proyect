# Sidebar — UI Specification

## Desktop (Expanded)

```
┌─────────────────────┐
│  [Logo]  Luxury ERP  │
│                       │
│  ▶ Dashboard          │
│  ▶ Inventory          │
│     ▷ Products        │
│     ▷ Categories      │
│     ▷ Stock           │
│     ▷ Movements       │
│     ▷ Warehouses      │
│  ▶ CRM                │
│     ▷ Customers       │
│     ▷ Interactions    │
│     ▷ Segments        │
│  ▶ Sales              │
│     ▷ Orders          │
│     ▷ Quotes          │
│     ▷ Returns         │
│  ▶ Billing            │
│     ▷ Invoices        │
│     ▷ Payments        │
│     ▷ Credit Notes    │
│  ▶ Reports            │
│  ▶ Settings           │
│                       │
│  ───────────────────  │
│  [User avatar]        │
│  Carlos García        │
│  Admin                │
└─────────────────────┘
```

## States

### Collapsed (Mobile / toggle)
```
┌──┐
│ ☰ │
│   │
│ ◆ │
│ ■ │
│ ▲ │
│ ● │
│ ★ │
└──┘
```
- Icons only
- Tooltip on hover shows label
- Sub-items in a flyout panel

### Active State
- Background highlight on current section
- Sub-items visible if parent is active

### Hover State
- Slight background change on hoverable items
- Cursor pointer

## Behavior
- Collapsible via hamburger button in header
- Sub-menus expand/collapse on click
- Active section auto-expands on page load
- Badge counts (e.g., overdue invoices count) shown next to menu items
- Bottom section: user info + logout

## Responsive
- Desktop: always visible (240px width)
- Tablet: collapsible, overlays content when open
- Mobile: hidden by default, slide-in drawer from left

## Animation
- Expand/collapse sub-menus: smooth 200ms height transition
- Collapse sidebar: width transition 200ms
- Mobile drawer: slide from left 250ms
