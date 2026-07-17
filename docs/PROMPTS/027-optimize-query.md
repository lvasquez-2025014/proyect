# Prompt: Optimize Query

```
Optimize a slow database query in the {module} module.

## Current Query
{SQL or JPQL code}

## Analysis
- Execution time: {time}
- Table size: {rows}
- Explain plan: {EXPLAIN ANALYZE output}

## Optimization Strategies
- Add missing index: {suggested index}
- Rewrite with join instead of subquery
- Use fetch join for N+1
- Add pagination with keyset pagination
- Use covering index (INCLUDE)
- Use materialized view for complex aggregations
- Use database-side computed column

## Rules
- Measure before and after (EXPLAIN ANALYZE)
- Prefer composite indexes over single-column
- Partial indexes for filtered queries
- No redundant indexes (duplicate leftmost columns)
- Test with production-like data volume
```
