# Permissions — Matriz de Roles y Accesos

## Jerarquía de Roles

```
SUPER_ADMIN (sistema — todas las compañías)
  │
  └── ADMIN (compañía — configuración + todos los módulos)
        │
        ├── MANAGER (sucursal — gestión + reportes + aprobaciones)
        │     │
        │     ├── SALES (ventas + CRM)
        │     ├── WAREHOUSE (inventario + recepción)
        │     ├── HR (recursos humanos)
        │     └── CASHIER (POS / cobranza)
        │
        └── VIEWER (solo lectura)
```

---

## Matriz de Permisos

### Inventory

| Permiso | SUPER_ADMIN | ADMIN | MANAGER | SALES | WAREHOUSE | VIEWER |
|---------|:-----------:|:-----:|:-------:|:-----:|:---------:|:------:|
| `product.create` | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| `product.read` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `product.update` | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| `product.delete` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `product.activate` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `category.manage` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `brand.manage` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `stock.read` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `stock.adjust` | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| `stock.transfer` | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| `warehouse.manage` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |

### CRM

| Permiso | SUPER_ADMIN | ADMIN | MANAGER | SALES | WAREHOUSE | VIEWER |
|---------|:-----------:|:-----:|:-------:|:-----:|:---------:|:------:|
| `customer.create` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `customer.read` | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| `customer.update` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `customer.delete` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `customer.merge` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `interaction.create` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `interaction.read` | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| `segment.manage` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `vip.manage` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |

### Sales

| Permiso | SUPER_ADMIN | ADMIN | MANAGER | SALES | WAREHOUSE | VIEWER |
|---------|:-----------:|:-----:|:-------:|:-----:|:---------:|:------:|
| `quote.create` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `quote.read` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `quote.convert` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `order.create` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `order.read` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `order.update` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `order.confirm` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `order.cancel` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `order.ship` | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| `order.delete` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `discount.apply` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `discount.approve` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `return.process` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |

### Billing

| Permiso | SUPER_ADMIN | ADMIN | MANAGER | SALES | WAREHOUSE | VIEWER |
|---------|:-----------:|:-----:|:-------:|:-----:|:---------:|:------:|
| `invoice.create` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `invoice.read` | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| `invoice.send` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `invoice.cancel` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `payment.record` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `payment.refund` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `creditnote.create` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |

### HR

| Permiso | SUPER_ADMIN | ADMIN | MANAGER | SALES | WAREHOUSE | VIEWER |
|---------|:-----------:|:-----:|:-------:|:-----:|:---------:|:------:|
| `employee.create` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `employee.read` | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ |
| `employee.update` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `employee.delete` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `leave.approve` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `payroll.process` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `payroll.read` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |

### Administration

| Permiso | SUPER_ADMIN | ADMIN | MANAGER | SALES | WAREHOUSE | VIEWER |
|---------|:-----------:|:-----:|:-------:|:-----:|:---------:|:------:|
| `user.create` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `user.read` | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ |
| `user.update` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `user.delete` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `company.settings` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `branch.manage` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `reports.read` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `audit.read` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `permissions.manage` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## Implementación en Código

```java
// Spring Boot method-level security
@PostMapping("/products")
@PreAuthorize("hasPermission('product.create')")
public ResponseEntity<ProductResponse> create(@Valid @RequestBody CreateProductRequest req) {
    return ResponseEntity.ok(service.create(req));
}
```

```typescript
// Frontend: conditional rendering
const canCreate = usePermission('product.create');
{canCreate && <Button>New Product</Button>}
```
