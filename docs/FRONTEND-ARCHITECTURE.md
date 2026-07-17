# Frontend Architecture — Next.js

## Request Lifecycle

```
Browser Request
  │
  ├── (marketing/page) → Next.js Server → RSC → HTML (SSR)
  │     └── Static/ISR → CDN Edge
  │
  └── /dashboard/* → Next.js Server → Auth Check → RSC → HTML
        └── Client Navigation → Router Cache → RSC Payload
              └── Client Components → Hydration → Interactive
```

---

## Server Components (RSC)

**Por defecto, todo es Server Component.** Solo añadir `"use client"` cuando sea estrictamente necesario.

| Capa | Qué hace | Dónde |
|------|----------|-------|
| **Server Component** | Fetch data, acceso a DB, secretos, lógica sensible | `app/**/page.tsx`, `app/**/layout.tsx` |
| **Client Component** | Interactividad, hooks, eventos, estado local | `components/**/*.tsx` (con "use client") |
| **Shared Component** | Renderizado en servidor + hidratado en cliente | Componentes sin "use client" que usan children |

### Reglas
- Datos se fetchean en Server Components y se pasan como props a Client Components
- Los Client Components aceptan `children` para evitar serializar JSX completos
- Las llamadas a API externas van en Server Components (más rápido, sin CORS)

---

## App Router Structure

```
app/
├── (marketing)/          # Route Group: landing pages (no auth)
│   ├── page.tsx          # Home
│   ├── features/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   └── layout.tsx        # Marketing layout (header, footer)
│
├── (auth)/               # Route Group: auth pages
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── layout.tsx        # Auth layout (centered card)
│
├── dashboard/            # Protected routes
│   ├── layout.tsx        # Dashboard layout (sidebar, header)
│   ├── page.tsx          # Dashboard home
│   ├── inventory/
│   │   ├── page.tsx      # Products list
│   │   ├── loading.tsx   # Skeleton loading
│   │   ├── error.tsx     # Error boundary
│   │   └── products/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           ├── page.tsx
│   │           └── edit/page.tsx
│   └── ...
│
├── api/                  # API routes (BFF)
│   └── ...
│
├── layout.tsx            # Root layout (fonts, providers)
├── sitemap.ts
└── robots.ts
```

---

## Component Hierarchy

```
RootLayout (Server)
  └── Providers (Client) — ThemeProvider, QueryClientProvider
       └── DashboardLayout (Server)
            ├── Sidebar (Client — interactiva)
            ├── Header (Client — search, notifications)
            └── Page Content (Server — data fetching)
                 └── DataTable (Client — sorting, pagination)
                      └── TableRow (Server — sin interactividad)
                           └── ActionsDropdown (Client — menú)
```

---

## Data Fetching Strategy

| Tipo | Estrategia | Herramienta |
|------|-----------|-------------|
| Datos iniciales de página | Fetch directo en Server Component | `fetch()` + async component |
| Datos que cambian frecuentemente | TanStack Query (client-side) | `useQuery()` con refetch |
| Datos de formularios | React Hook Form + mutation | `useMutation()` + invalidate |
| Datos estáticos | ISR / Static Generation | `revalidate` en fetch |
| Datos en tiempo real | WebSocket (futuro) | `useWebSocket()` hook |

### Server Component Fetch

```typescript
// app/dashboard/inventory/page.tsx — Server Component
async function ProductsPage() {
  const products = await api.getProducts({ page: 0 });
  return <ProductTable initialData={products} />;
}
```

### TanStack Query (cuando se necesita interactividad)

```typescript
// components/modules/inventory/ProductTable.tsx — Client Component
function ProductTable({ initialData }: { initialData: Page<Product> }) {
  const { data, isFetching } = useQuery({
    queryKey: ['products', page],
    queryFn: () => api.getProducts({ page }),
    initialData,
  });
  // ...
}
```

---

## Streaming & Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { DashboardSkeleton } from '@/components/skeletons';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <SlowKPIs />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}
```

---

## Caching Strategy

| Nivel | Cache | Invalidation |
|-------|-------|-------------|
| Next.js Full Route Cache | HTML generado | `revalidatePath()` / `revalidateTag()` |
| Router Cache (cliente) | RSC Payload | Navegación, `router.refresh()` |
| TanStack Query Cache | Datos API | `queryClient.invalidateQueries()` |
| React Cache (server) | `cache()` function | Por request |
| Redis (backend) | API responses | TTL + evento |

---

## Error Boundaries

```typescript
// app/dashboard/inventory/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

Cada ruta tiene su propio `error.tsx`. Los errores no rompen el layout padre.
