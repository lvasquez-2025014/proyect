# Frontend Guidelines

---

## Component Architecture

```
app/dashboard/inventory/
├── page.tsx                   # Route page (server component)
├── loading.tsx                # Loading skeleton
├── error.tsx                  # Error boundary
├── product/
│   ├── page.tsx               # Product list page
│   ├── [id]/
│   │   ├── page.tsx           # Product detail page (server)
│   │   └── edit/
│   │       └── page.tsx       # Product edit page
│   └── new/
│       └── page.tsx           # New product page
└── _components/               # Module-specific components
    ├── ProductTable.tsx       # Client component
    ├── ProductForm.tsx
    ├── ProductCard.tsx
    └── StockBadge.tsx
```

## Component Rules

1. **Server components by default** — only add `"use client"` when you need interactivity (hooks, event handlers, state).
2. **One component per file** — unless the secondary component is tiny and tightly coupled.
3. **Props over state** — prefer passing props to internal state; components should be predictable.
4. **Compose, don't inherit** — component composition over inheritance or complex prop drilling.

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Files & directories | `kebab-case` | `product-table.tsx` |
| React components | `PascalCase` | `ProductTable` |
| Hooks | `camelCase`, prefix `use` | `useProducts` |
| Utility functions | `camelCase` | `formatCurrency` |
| Types/interfaces | `PascalCase`, prefix `I` for interfaces | `Product`, `IProductService` |
| Stores | `camelCase`, file matches store | `useAuthStore` in `auth-store.ts` |
| CSS classes | Tailwind (no custom classes unless necessary) | — |

## State Management

### Zustand (global / client state)
```typescript
// stores/ui-store.ts
import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
```

### TanStack Query (server state)
```typescript
// hooks/use-products.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProducts(page = 0) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => api.get(`/api/v1/inventory/products?page=${page}`),
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/api/v1/inventory/products", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
```

## Forms

- Use **React Hook Form** for form state.
- Use **Zod** for schema validation.
- Use **shadcn/ui** form components (`<FormField>`, `<FormItem>`, etc.).

```typescript
const schema = z.object({
  name: z.string().min(1, "Required"),
  price: z.number().positive(),
  categoryId: z.string().uuid(),
});

type FormData = z.infer<typeof schema>;

function ProductForm() {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  // ...
}
```

## API Client

```typescript
// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  if (!res.ok) throw new ApiError(res.status, await res.json());
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
```

## Styling Guidelines

- **Tailwind utility classes** for 95% of styling.
- **shadcn/ui** components for primitives (buttons, inputs, dialogs, tables).
- **Custom CSS** only for complex animations or when Tailwind cannot express the design.
- **Dark mode** — use `dark:` prefix; all components must support both themes.
- **No inline styles** (except dynamic values like transforms).

## Performance

- Keep server components lean — move interactive parts to client boundaries.
- Use `React.memo` sparingly and after profiling.
- Lazy load heavy components: `const Chart = dynamic(() => import("./Chart"))`.
- Use Next.js `<Image>` for optimized images.
- Minimize bundle: avoid `import *` from large libraries.
