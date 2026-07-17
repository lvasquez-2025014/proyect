# Navbar (Header) — UI Specification

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  [☰]  Luxury ERP  │  [Breadcrumb]  │ [🔍] [🔔] [👤 ▾]    │
└──────────────────────────────────────────────────────────────┘
```

## Elements

### Left
- **Hamburger menu** (☰) — toggles sidebar on mobile, collapsible on desktop
- **Company logo + name** (or just logo on small screens)

### Center
- **Breadcrumb**: e.g., `Dashboard > Inventory > Products > Edit`
- Last item is current page (not clickable)
- Clickable items navigate up the hierarchy

### Right
- **Global search** (🔍): Click opens a command palette (⌘K-style)
  - Search across: products, customers, orders, invoices
  - Keyboard shortcut: Ctrl+K / ⌘K
  - Results grouped by type
  - Quick actions: "Create product", "New order"
- **Notifications** (🔔): Bell icon with badge count
  - Click opens dropdown list of recent notifications
  - "Mark all as read" link
  - "View all" link → notifications page
  - Empty state: "No new notifications"
- **User menu** (👤 ▾): Avatar + name
  - Dropdown: Profile, Settings, Theme toggle, Logout
  - Shows user role below name

## Themes
- Light mode: white background, dark text
- Dark mode: dark background, light text
- Theme toggle in user menu dropdown

## Responsive
- Desktop: full header
- Tablet: breadcrumb hidden on scroll, hamburger always visible
- Mobile: only logo + hamburger + notification bell (text hidden)

## States
- Scrolled: subtle bottom border/shadow
- Notification badge: red dot with number (max 99+)
- Search overlay: backdrop + centered modal
