# Prompt: Create Chart

```
Create a chart component for the dashboard.

## Location
apps/web/components/charts/{ChartName}.tsx

## Libraries
- Recharts (primary)
- Chart.js / nivo (secondary)

## Props Interface
interface {ChartName}Props {
  data: Array<{ label: string; value: number; [key: string]: any }>;
  title?: string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
}

## Types
- LineChart: time series, trends
- BarChart: comparisons
- PieChart: distributions
- AreaChart: cumulative trends
- ComposedChart: mixed types

## States
- Loading: skeleton chart area
- Empty: "No data for this period"
- Error: "Could not load chart"

## Rules
- Responsive container (use ResizeObserver)
- Accessible (aria-label, role="img")
- Tooltip on hover
- Export to PNG (optional)
- Dark mode support (chart colors adapt to theme)
- Consistent color palette (from BRANDING/Colors.md)
```
