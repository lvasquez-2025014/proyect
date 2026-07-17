# RISK-002: Performance at Scale

**Status**: Active
**Probability**: Medium
**Impact**: High
**Category**: Performance

## Description
As data grows (millions of products, orders, movements), query performance may degrade, especially for stock movements and audit logs.

## Mitigation
- Indexes designed from day 1 (see DATABASE/ docs)
- Pagination on all list endpoints (max 100 per page)
- Keyset pagination for large datasets (future)
- Partition stock_movements and audit_logs by date (monthly)
- Cache frequent reads in Redis
- Monitor slow queries with pg_stat_statements
- Regular EXPLAIN ANALYZE reviews

## Contingency
If performance degrades:
1. Identify slow queries via monitoring
2. Add missing indexes or optimize queries
3. Consider read replicas for reporting queries
4. Archive old data (move to cold storage)
