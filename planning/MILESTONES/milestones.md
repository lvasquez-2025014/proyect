# Milestones

| Milestone | Target Date | Deliverable | Dependencies |
|-----------|-------------|-------------|-------------|
| M1: Auth Complete | Week 2 | Login, register, JWT, multi-tenant, RBAC | — |
| M2: Inventory Complete | Week 6 | Products, stock, movements, search | M1 |
| M3: CRM Complete | Week 8 | Contacts, interactions, VIP profiles | M1 |
| M4: Sales Complete | Week 10 | Orders, quotes, order lifecycle, stock events | M2, M3 |
| M5: Billing Complete | Week 12 | Invoices, payments, credit notes, PDF | M4 |
| M6: MVP Release | Week 12 | v0.1 release | M1-M5 |
| M7: v0.2 Release | Q4 2026 | Full core business | M6 |
| M8: v0.3 Release | Q1 2027 | Advanced features | M7 |
| M9: v1.0 Release | Q2 2027 | Production ready | M8 |

## Tracking
Each milestone has a GitHub Milestone with associated issues.

## Gate Criteria for M6 (MVP Release)
- [ ] All core CRUD operations working
- [ ] Authentication and authorization tested
- [ ] Multi-tenant isolation verified
- [ ] Stock movements auditable
- [ ] Basic UI functional (not just API)
- [ ] CI pipeline passing
- [ ] Docker Compose setup working
- [ ] Backup strategy documented
