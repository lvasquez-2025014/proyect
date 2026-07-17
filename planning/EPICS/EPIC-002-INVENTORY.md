# EPIC-002: Inventory Management

**Status**: Pending
**Priority**: Critical
**Dependencies**: EPIC-001 (Authentication)

## Description
Complete inventory module: products, categories, brands, variants, stock management, warehouses, and movements.

## Objectives
- Full product CRUD with rich attributes
- Category tree (parent/child) and brand management
- Product variants (size, color, material — unlimited attributes)
- Multi-warehouse stock tracking
- Stock movements with full audit trail
- Lot and serial number tracking
- Low stock alerts and reorder points

## Acceptance Criteria
- [ ] Products CRUD with SKU, name, price, cost, tax, unit
- [ ] Categories with hierarchical tree structure
- [ ] Brands with logo and metadata
- [ ] Variants with unlimited attribute combinations
- [ ] Stock tracked per product+variant+warehouse+lot
- [ ] Stock movements append-only (never deleted)
- [ ] Stock adjustments with reason and audit
- [ ] Stock transfers between warehouses
- [ ] Lot tracking with expiry dates
- [ ] Serial number tracking per item
- [ ] Low stock alerts trigger at reorder point
- [ ] Product search by SKU, name, barcode, category

## Technical Notes
- `available = quantity - reserved` as generated column
- Full-text search with tsvector (Spanish)
- JSONB for variant attributes
- Unique SKU per company

## Epic Dependencies
EPIC-001

## Estimated Effort
3-4 sprints
