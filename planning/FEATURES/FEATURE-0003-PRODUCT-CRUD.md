# FEATURE-0003: CRUD de Producto

**Estado**: Pendiente
**Prioridad**: Alta
**Épica**: EPIC-002 (Inventario)
**Estimación**: 5 días

## Descripción
Crear, leer, actualizar y eliminar (soft-delete) productos. Gestión completa del catálogo de productos.

## Criterios de Aprobación
- [ ] Crear producto: SKU, nombre, descripción, precio, costo, impuestos, categoría, marca, unidad
- [ ] Editar producto: todos los campos editables
- [ ] Ver producto: página de detalle con toda la información
- [ ] Listar productos: paginado, ordenable, filtrable
- [ ] Eliminación suave (soft delete): productos desactivados ocultos de las ventas
- [ ] Imágenes de productos (subir, reordenar, establecer como principal)
- [ ] Validación de unicidad de SKU por empresa
- [ ] Búsqueda de productos por SKU, nombre, código de barras

## Endpoints de la API
- GET /api/v1/inventory/products (paginado, buscable)
- GET /api/v1/inventory/products/{id}
- POST /api/v1/inventory/products
- PATCH /api/v1/inventory/products/{id}
- DELETE /api/v1/inventory/products/{id} (soft delete)

## UI
- Página de lista de productos con tabla, búsqueda, filtros
- Formulario de producto con secciones: información básica, precios, descripción
- Componente de galería de imágenes
