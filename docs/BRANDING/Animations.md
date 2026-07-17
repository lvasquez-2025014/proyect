# Animations — Branding

## Principles
- Animations are subtle, never distracting
- Duration between 150ms–400ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (material-style ease)
- Respect `prefers-reduced-motion`

## Transition Defaults

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Component Animations

| Component | Animation | Duration | Notes |
|-----------|-----------|----------|-------|
| Modal | Fade in + scale (0.95→1) | 200ms | Content fades in after backdrop |
| Sidebar | Slide from left | 250ms | On mobile, overlay backdrop |
| Dropdown | Fade in + translateY(-4px) | 150ms | |
| Tooltip | Fade in | 150ms | Delay 300ms before showing |
| Page transition | Fade in | 200ms | No slide (prefer simple) |
| Tabs | Content crossfade | 200ms | |
| Accordion | Height expand/collapse | 250ms | |
| Skeleton | Pulse opacity | 1.5s | Infinite loop |
| Notification (toast) | Slide from right | 300ms | Auto-dismiss after 5s |
| Button hover | Background/tint change | 150ms | |
| Row hover | Background change | 150ms | |

## Page Transitions (Next.js)

```typescript
// app/layout.tsx — use `animate-presence` wrapper
// Not for dashboard (app shell stays, content changes)
// For marketing pages (full page transitions)
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Rules
- Do not animate layout properties (width, height, top, left) — use transforms
- Do not animate elements that are leaving the viewport (use opacity + transform)
- Do not use bounce, jello, or flashy entrance animations
- Loading states use skeleton screens, not spinners (except for buttons)
