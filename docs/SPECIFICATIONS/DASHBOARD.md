# Dashboard — Business Specification

## Objective
Provide role-specific overviews with key performance indicators (KPIs), charts, and actionable summaries.

## Actors
- Executive
- Branch manager
- Sales manager
- Inventory manager
- Sales associate

## Dashboard Types

### Executive Dashboard
- Revenue (today, this week, this month, this year)
- Revenue vs previous period (% change)
- Top 10 products by revenue
- Sales by branch (pie chart)
- Sales by category
- Monthly trend (line chart, 12 months)
- Active customers count
- Open orders count
- Overdue invoices (count + amount)
- Low stock alerts

### Sales Manager Dashboard
- Team sales vs target
- Sales per associate (bar chart)
- Conversion rate (quotes → orders)
- Average order value
- Orders by status (funnel)
- Top 5 customers
- Recent orders (table, last 24h)

### Inventory Manager Dashboard
- Total SKUs
- Low stock items
- Stock value (total cost)
- Stock turnover rate
- Stock accuracy (% physical count matches system)
- Recent stock movements
- Receive pending POs

### Branch Manager Dashboard
- Branch revenue vs target
- Branch expenses
- Branch stock value
- Staff on duty
- Customer visits (future)

### Sales Associate Dashboard
- My sales today
- My open quotes
- My pending tasks
- My customers (recently active)
- My targets (progress)

## Design Notes
- KPIs update in real-time (or near real-time).
- Each KPI shows current value + trend indicator (up/down/flat).
- Charts are interactive (hover for details, click to drill-down).
- Dashboard layout is configurable (drag & drop widgets — future).
- Print-friendly view.
