# Component Rules

## React Component Rules

### Composition Over Configuration
- Build complex components from smaller, focused components
- Use `children` and render props over configuration objects
- Prefer `composition` over prop drilling

```tsx
// ✅ Good: composition
<Card>
  <CardHeader>
    <CardTitle>Product Details</CardTitle>
    <CardDescription>SKU: LMW-001</CardDescription>
  </CardHeader>
  <CardContent>
    <ProductInfo product={product} />
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>

// ❌ Bad: monolithic config
<Card
  title="Product Details"
  subtitle="SKU: LMW-001"
  content={<ProductInfo product={product} />}
  footer={<Button>Save</Button>}
/>
```

### One Component Per File
- Exception: small, tightly coupled helper components (e.g., `Table.Cell`, `Card.Header`)
- File name matches component name: `ProductTable.tsx` exports `ProductTable`

### Props Interface
- Define and export interface for every component
- Use `interface` (not `type`) for public props (better error messages)

```tsx
export interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
  className?: string;
}
```

### State Location

| State Type | Location |
|------------|----------|
| Server data | TanStack Query (cache) |
| UI state (sidebar, theme, modals) | Zustand (global) |
| Form state | React Hook Form (local) |
| Ephemeral UI (accordion, dropdown) | `useState` (local) |

### Server Components by Default
- Only add `"use client"` when necessary (hooks, events, browser APIs)
- Keep data fetching in server components
- Push client boundaries as far down as possible

### Error Handling
- Each route needs `error.tsx` (route-level error boundary)
- Use `Suspense` with `fallback` for async content
- Use `ErrorBoundary` for client component errors

### Performance
- Use `React.memo` sparingly — only after profiling shows a bottleneck
- Use `useMemo` / `useCallback` only for referential stability (not for "optimization")
- Lazy load heavy components with `next/dynamic`

### Styling
- Use Tailwind utility classes for all styling
- Use `cn()` utility for conditional class merging
- Never use inline styles (except dynamic values like `transform`)
- Extract repeated Tailwind patterns into reusable components, not custom CSS

### Accessibility
- All interactive elements accessible via keyboard
- Proper ARIA labels on icon-only buttons
- Form fields have associated labels
- Color not the only means of conveying information

### Testing
- Test component behavior, not implementation
- Use `data-testid` only as last resort (prefer `getByRole`, `getByText`)
- Test: renders, interactions, loading state, error state, empty state
