# FEATURE-0003: Product CRUD

**Status**: Pending
**Priority**: High
**Epic**: EPIC-002 (Inventory)
**Estimate**: 5 days

## Description
Create, read, update, and soft-delete products. Full product catalog management.

## Acceptance Criteria
- [ ] Create product: SKU, name, description, price, cost, tax, category, brand, unit
- [ ] Edit product: all fields editable
- [ ] View product: detail page with all info
- [ ] List products: paginated, sortable, filterable
- [ ] Soft delete (deactivated products hidden from sales)
- [ ] Product images (upload, reorder, set primary)
- [ ] SKU uniqueness validation per company
- [ ] Product search by SKU, name, barcode

## API Endpoints
- GET /api/v1/inventory/products (paginated, searchable)
- GET /api/v1/inventory/products/{id}
- POST /api/v1/inventory/products
- PATCH /api/v1/inventory/products/{id}
- DELETE /api/v1/inventory/products/{id} (soft delete)

## UI
- Product list page with table, search, filters
- Product form with sections: basic info, pricing, description
- Image gallery component
