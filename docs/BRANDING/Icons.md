# Icons — Branding

## Icon Set

- **Library**: Lucide Icons (open source, consistent style)
- **License**: MIT
- **Usage**: All interface icons (navigation, actions, status, empty states)

## Guidelines

- **Size**: 16px (inline), 20px (buttons), 24px (navigation), 32px (empty states)
- **Stroke width**: 2px (consistent)
- **Color**: Inherit from text color (use `currentColor`)
- **Style**: Outlined, consistent stroke, rounded caps/joins

## Category Examples

| Category | Icons |
|----------|-------|
| Navigation | `LayoutDashboard`, `Package`, `Users`, `FileText`, `Settings` |
| Actions | `Plus`, `Pencil`, `Trash2`, `Copy`, `Download` |
| Status | `CheckCircle`, `AlertCircle`, `Clock`, `XCircle` |
| Communication | `Mail`, `Phone`, `MessageCircle` |
| Finance | `DollarSign`, `CreditCard`, `Receipt` |
| Notifications | `Bell`, `BellRing` |
| Data | `Search`, `Filter`, `ArrowUpDown` |

## Usage in Code

```tsx
import { Package, Plus, Search } from "lucide-react";

// Inline with text
<Button>
  <Plus className="h-4 w-4 mr-2" />
  New Product
</Button>

// Standalone icon button
<Button variant="ghost" size="icon">
  <Search className="h-5 w-5" />
</Button>
```

## Rules
- Do not use emoji as icons
- Do not mix icon styles (stick to Lucide)
- Do not use filled variants (use outline only)
- Do not apply custom colors outside of semantic palette
- Always add accessible label for standalone icon buttons
