# Prompt: Create Store (Zustand)

```
Create a Zustand store for {domain} state management.

## Location
apps/web/stores/{name}-store.ts

## Pattern
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface {Name}State {
  // State
  items: {Type}[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setItems: (items: {Type}[]) => void;
  addItem: (item: {Type}) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

export const use{Name}Store = create<{Name}State>()(
  persist(
    (set) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,

      // Actions
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      reset: () => set({ items: [], isLoading: false, error: null }),
    }),
    {
      name: '{name}-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);

## Use Cases for Zustand
- UI state: sidebar, theme, modals
- Auth state: current user, tokens (memory only, not persisted)
- Form wizards: multi-step form data
- Cart: POS temporary cart
- NOT for server state (use TanStack Query)

## Rules
- One store per domain concern
- Keep stores small (max 5 actions)
- Use persist middleware carefully (only for non-sensitive, non-server data)
- Never store server data in Zustand (race conditions)
```
