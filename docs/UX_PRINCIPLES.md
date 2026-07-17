# UX Principles

## Principios Rectores

1. **Feedback inmediato.** Cada acción del usuario genera una respuesta visible en < 100ms (o un indicador si es más lenta).
2. **Predecibilidad.** Los mismos patrones funcionan igual en todo el sistema.
3. **Perdón.** Las acciones destructivas siempre tienen confirmación. Las equivocaciones se pueden deshacer.
4. **Consistencia.** Misma terminología, mismos atajos, mismo layout en todo el ERP.
5. **Accesibilidad.** No hay barreras para usuarios con discapacidades (WCAG 2.1 AA).

---

## Estados de UI

Cada componente debe considerar 4 estados:

### 1. Loading (Cargando)
- **Qué mostrar**: Skeleton screens (no spinners)
- **Duración**: < 1s → skeleton. > 1s → skeleton + progress indicator
- **Regla**: Nunca mostrar pantalla en blanco

```tsx
// ✅ Skeleton component
function ProductTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  );
}
```

### 2. Empty (Vacío)
- **Qué mostrar**: Ilustración + mensaje + CTA
- **Nunca**: tabla vacía sin explicación

```
┌─────────────────────────┐
│    [Illustration]       │
│                         │
│  No products yet        │
│  Create your first      │
│  product to get started │
│                         │
│  [+ New Product]        │
└─────────────────────────┘
```

### 3. Error
- **Qué mostrar**: Mensaje claro + qué hacer + botón de reintento
- **Nunca**: "An error occurred" sin contexto

```
┌─────────────────────────┐
│  ⚠ Something went wrong │
│                         │
│  We couldn't load your  │
│  products. Please try   │
│  again.                 │
│                         │
│  [Try Again]            │
│  [Contact Support]      │
└─────────────────────────┘
```

### 4. Success (Datos)
- **Qué mostrar**: Los datos esperados en el formato adecuado
- **Opcional**: Toast de confirmación para acciones

---

## Feedback Patterns

| Acción | Feedback | Tipo |
|--------|----------|------|
| Click botón | Hover + active state | Inmediato |
| Submit formulario | Loading button → success toast | < 2s |
| Acción destructiva | Confirmation dialog | Antes de ejecutar |
| Operación larga (import) | Progress bar + % completado | Durante |
| Operación async (PDF) | "We'll notify you when ready" | Inmediato + notificación |

---

## Optimistic Updates

Para operaciones donde la UI puede anticipar el resultado:

```typescript
function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post('/products', data),
    onMutate: async (newProduct) => {
      // Cancel queries
      await queryClient.cancelQueries(['products']);
      // Snapshot previous
      const previous = queryClient.getQueryData(['products']);
      // Optimistically update
      queryClient.setQueryData(['products'], (old) => ({
        ...old,
        content: [newProduct, ...old.content],
      }));
      return { previous };
    },
    onError: (err, newProduct, context) => {
      // Rollback
      queryClient.setQueryData(['products'], context.previous);
      toast.error('Failed to create product');
    },
  });
}
```

---

## Formularios

### Reglas
- Labels arriba del input (nunca placeholder como label)
- Errores debajo del campo (no en tooltip)
- Botón de submit siempre visible y habilitado (deshabilitar solo durante envío)
- Autofocus en el primer campo
- Atajo: Enter para submit

### Validación
| Timing | Tipo | UX |
|--------|------|-----|
| On blur | Validación de campo | Muestra error debajo del campo |
| On change (después del primer blur) | Corrección | Remueve error si se corrige |
| On submit | Completa | Muestra todos los errores + scroll al primero |

### Estados
```
Idle → Filled → Valid → Submitting → Success / Error
```

---

## Navegación

- **Breadcrumbs** en todas las páginas del dashboard (excepto home)
- **Atajos de teclado**: Ctrl+K para búsqueda global
- **Back navigation**: El botón "Back" del navegador funciona como espera el usuario
- **Unsaved changes**: Diálogo de confirmación al navegar con cambios sin guardar

---

## Mensajes de Error

| Malo | Bueno |
|------|-------|
| "Error 500" | "We couldn't save the product. Please try again." |
| "Validation failed" | "SKU is required. Product name must be at least 2 characters." |
| "Access denied" | "You don't have permission to delete products. Contact your manager." |
| "Network error" | "Couldn't reach the server. Check your connection." |

---

## Responsive

| Breakpoint | Comportamiento |
|-----------|----------------|
| Desktop (≥ 1024px) | Layout completo con sidebar visible |
| Tablet (768-1023px) | Sidebar colapsable, tablas con scroll horizontal |
| Mobile (< 640px) | Sidebar como drawer, tablas → cards, formularios single column |

---

## Dark Mode

- **Por defecto**: Respeta `prefers-color-scheme`
- **Toggle**: Disponible en menú de usuario (persistente en localStorage)
- **Consistencia**: Todos los componentes tienen variante dark
- **Contraste**: Mínimo 4.5:1 en ambos modos
