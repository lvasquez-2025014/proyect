# UI/UX — Design System

---

## Design Principles

1. **Luxury, not clutter** — every pixel serves a purpose. White space is a feature.
2. **Consistency over creativity** — predictable patterns build trust.
3. **Accessibility is non-negotiable** — WCAG 2.1 AA minimum.
4. **Performance is part of the experience** — fast load times = premium feel.
5. **Responsive by default** — desktop-first, tablet-friendly, mobile-capable.

---

## Color Palette

```css
:root {
  /* Primary */
  --color-primary: #1a1a2e;        /* Deep navy */
  --color-primary-light: #2d2d4a;
  --color-primary-dark: #0f0f1a;

  /* Accent */
  --color-accent: #c9a84c;         /* Gold */
  --color-accent-light: #e0c872;
  --color-accent-dark: #a88830;

  /* Neutral */
  --color-bg: #ffffff;
  --color-bg-secondary: #f8f8fa;
  --color-bg-tertiary: #f0f0f3;
  --color-surface: #ffffff;
  --color-border: #e2e2e8;
  --color-text: #1a1a2e;
  --color-text-secondary: #6b6b80;
  --color-text-tertiary: #9e9eb0;

  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

.dark {
  --color-bg: #0f0f1a;
  --color-bg-secondary: #1a1a2e;
  --color-bg-tertiary: #2d2d4a;
  --color-surface: #1a1a2e;
  --color-border: #2d2d4a;
  --color-text: #f0f0f3;
  --color-text-secondary: #9e9eb0;
  --color-text-tertiary: #6b6b80;
}
```

## Typography

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `text-xs` | 0.75rem | 400 | Captions |
| `text-sm` | 0.875rem | 400 | Labels, secondary text |
| `text-base` | 1rem | 400 | Body |
| `text-lg` | 1.125rem | 500 | Large body |
| `text-xl` | 1.25rem | 600 | Section titles |
| `text-2xl` | 1.5rem | 700 | Page titles |
| `text-3xl` | 1.875rem | 700 | H1 |
| `text-4xl` | 2.25rem | 800 | Hero titles |

**Font Family**: `Inter` (sans-serif) for UI, `Playfair Display` (serif) for marketing headlines.

## Spacing

```
space-1:  0.25rem  (4px)
space-2:  0.5rem   (8px)
space-3:  0.75rem  (12px)
space-4:  1rem     (16px)
space-6:  1.5rem   (24px)
space-8:  2rem     (32px)
space-12: 3rem     (48px)
space-16: 4rem     (64px)
space-24: 6rem     (96px)
```

## Component Design

### Buttons

| Variant | Usage |
|---------|-------|
| `primary` | Main actions (Save, Create, Submit) |
| `secondary` | Alternative actions |
| `ghost` | Subtle actions (cancel, back) |
| `destructive` | Delete, remove |
| `outline` | Less emphasis than secondary |

### Forms

- Labels above inputs (not placeholder as label).
- Error messages below the field.
- Required fields marked with `*`.
- Group related fields with `<fieldset>`.

### Tables

- Every table has: header row, striped rows, hover state.
- Sortable columns indicated by arrow icons.
- Pagination at bottom (or infinite scroll for feeds).
- Row actions via dropdown menu (edit, delete, duplicate).

### Cards

- Clean borders, subtle shadow on hover.
- Padding consistent: `space-6` inside.
- Title + metadata + content + actions.

## Animations

```css
/* Transition defaults */
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;
}
```

- Page transitions: subtle fade + slide.
- Modals: fade in + scale.
- Sidebar: smooth slide.
- Data loading: skeleton screens (no spinners for content).
- Hover states: color/border transitions.

## Responsive Breakpoints

```css
/* Tailwind defaults */
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Wide desktop */
2xl: 1536px  /* Ultra-wide */
```

### Layout Strategy

- Dashboard: sidebar (collapsible on mobile) + main content.
- Forms: single column on mobile, multi-column on desktop.
- Tables: horizontal scroll on mobile with sticky first column.

## Dark Mode

- System default: respect `prefers-color-scheme`.
- User toggle: stored in Zustand + localStorage.
- Every component must have `dark:` variant.
- Never hardcode colors — use CSS variables.

## Accessibility Checklist

- [ ] All images have `alt` text.
- [ ] Forms have proper `<label>` associations.
- [ ] Color contrast ratio ≥ 4.5:1 for text.
- [ ] Focus indicators visible (not removed).
- [ ] Keyboard navigable (Tab, Enter, Escape).
- [ ] ARIA labels on interactive elements.
- [ ] Error messages read by screen readers (`aria-live`).
- [ ] Touch targets ≥ 44×44px on mobile.
