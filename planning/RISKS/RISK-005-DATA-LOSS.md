# RISK-005: Data Loss or Corruption

**Status**: Active
**Probability**: Low
**Impact**: Critical
**Category**: Data

## Description
Database corruption, accidental deletion, or migration failure could cause data loss.

## Mitigation
- Automated daily backups with 30-day retention
- Backup stored in different region/location
- Monthly test restore (verify backup integrity)
- Flyway migrations versioned and tested before apply
- Read-only transactions for queries
- Audit log append-only (cannot be modified)
- Soft delete (data never truly deleted)

## Contingency
If data loss occurs:
1. Restore from latest backup
2. Replay audit logs to reconstruct lost transactions
3. Investigate root cause and prevent recurrence
4. Notify affected users
