# Prompt: Create Table

```
Create a data table component for {entityPlural} in the {module} module.

## Location
apps/web/components/modules/{module}/{Entity}Table.tsx

## Props Interface
interface {Entity}TableProps {
  data: Page<{Entity}>;
  onPageChange: (page: number) => void;
  onSort: (sort: string) => void;
  onRowClick?: (id: string) => void;
  isLoading?: boolean;
}

## Structure
- shadcn/ui Table component
- Sortable column headers
- Row hover and click states
- Pagination controls
- Empty state when no data
- Loading skeleton when loading

## Features
- Checkbox column for bulk selection
- Action column with dropdown (view, edit, delete)
- Status badges with colors
- Responsive: horizontal scroll on mobile
- Optional: column visibility toggle

## Rules
- Use shadcn/ui Table, TableHeader, TableBody, TableRow, TableCell
- Use @tanstack/react-table for complex tables (sort, filter, selection)
- Server-side pagination (not client-side)
- Format dates with date-fns, money with formatCurrency
```
