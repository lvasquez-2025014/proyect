# Prompt: Create Dashboard

```
Create a dashboard page for {role/entity} in the ERP.

## Route
/dashboard/{module}/page.tsx

## Layout
- KPI cards row (4-6 KPIs)
- Charts section (1-2 charts, side by side)
- Recent data table (bottom)

## Components
- KPICard: icon, label, value, trend indicator (up/down/flat)
- LineChart: monthly trend
- BarChart: comparison (branches, categories, salespeople)
- DataTable: recent items with status

## States
- Loading: skeleton cards + skeleton charts + skeleton table
- Empty: illustration + "No data available"
- Error: inline error

## Data Fetching
- Server component with direct fetch
- Or TanStack Query if interactivity needed
- All endpoints from API/analytics.md

## Rules
- One purpose per chart (don't overload)
- Accessible charts (aria-labels, descriptions)
- Responsive: 4 columns → 2 columns → 1 column
- Print-friendly CSS
```
