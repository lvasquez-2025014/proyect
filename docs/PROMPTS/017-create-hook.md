# Prompt: Create Hook

```
Create a custom React hook for {entity} data operations.

## Location
apps/web/hooks/use-{entity}.ts

## Pattern
- TanStack Query for data fetching
- TanStack Query mutations for writes
- TypeScript strict typing

## Example Structure
export function use{Entity}(id: string) {
  return useQuery({
    queryKey: ['{entity}', id],
    queryFn: () => api.get<{Entity}>(`/api/v1/{module}/{resources}/${id}`),
    enabled: !!id,
  });
}

export function use{Entity}List(params: {Entity}ListParams) {
  return useQuery({
    queryKey: ['{entity}s', params],
    queryFn: () => api.get<Page<{Entity}>>(`/api/v1/{module}/{resources}`, { params }),
  });
}

export function useCreate{Entity}() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Create{Entity}Data) => api.post(`/api/v1/{module}/{resources}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['{entity}s'] });
      toast.success('{Entity} created successfully');
    },
    onError: (error) => toast.error(error.message),
  });
}

## Rules
- One hook file per entity
- Export both read and mutation hooks
- Use query key conventions from docs/DECISIONS/Naming.md
- Handle loading, error, success states
- Optimistic updates for frequently used mutations
```
