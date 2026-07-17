# EPIC-002: Gestión de Inventario

**Estado**: Pendiente
**Prioridad**: Crítica
**Dependencias**: EPIC-001 (Autenticación)

## Descripción
Módulo de inventario completo: productos, categorías, marcas, variantes, gestión de stock, almacenes y movimientos.

## Objetivos
- CRUD completo de productos con atributos ricos
- Árbol de categorías (padre/hijo) y gestión de marcas
- Variantes de productos (talla, color, material — atributos ilimitados)
- Seguimiento de stock multi-almacén
- Movimientos de stock con registro de auditoría completo
- Seguimiento de lotes y números de serie
- Alertas de stock bajo y puntos de reorden

## Criterios de Aprobación
- [ ] CRUD de productos con SKU, nombre, precio, costo, impuestos, unidad
- [ ] Categorías con estructura de árbol jerárquica
- [ ] Marcas con logotipo y metadatos
- [ ] Variantes con combinaciones de atributos ilimitadas
- [ ] Stock rastreado por producto+variante+almacén+lote
- [ ] Movimientos de stock de solo adición (nunca se eliminan)
- [ ] Ajustes de stock con motivo y auditoría
- [ ] Transferencias de stock entre almacenes
- [ ] Seguimiento de lotes con fechas de caducidad
- [ ] Seguimiento de números de serie por artículo
- [ ] Las alertas de stock bajo se activan en el punto de reorden
- [ ] Búsqueda de productos por SKU, nombre, código de barras, categoría

## Notas Técnicas
- `available = quantity - reserved` como columna generada
- Búsqueda de texto completo con tsvector (Español)
- JSONB para los atributos de las variantes
- SKU único por empresa

## Dependencias de la Épica
EPIC-001

## Esfuerzo Estimado
3-4 sprints
