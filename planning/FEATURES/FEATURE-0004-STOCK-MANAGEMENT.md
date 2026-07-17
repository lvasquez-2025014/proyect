# FEATURE-0004: Gestión de Stock

**Estado**: Pendiente
**Prioridad**: Alta
**Épica**: EPIC-002 (Inventario)
**Estimación**: 5 días

## Descripción
Rastrear niveles de stock por producto+variante+almacén, registrar movimientos, gestionar ajustes y transferencias.

## Criterios de Aprobación
- [ ] Ver niveles de stock para un producto (por almacén)
- [ ] Registrar stock entrante (recibo de compra)
- [ ] Registrar stock saliente (envío de venta)
- [ ] Ajuste de stock (corrección de conteo físico)
- [ ] Transferencia de stock entre almacenes
- [ ] Historial de movimientos de stock (solo adición, nunca se elimina)
- [ ] Reservas de stock (para pedidos confirmados)
- [ ] Indicador de stock bajo (resaltar productos por debajo del punto de reorden)
- [ ] Registro de auditoría de stock: quién, qué, cuándo, valor anterior, valor nuevo

## Reglas de Negocio
- El stock nunca puede ser negativo
- Un movimiento nunca se elimina (solo se revierte)
- Disponible = cantidad - reservado
- Las reservas expiran después de 24 horas

## Endpoints de la API
- GET /api/v1/inventory/stock?productId=&warehouseId=
- POST /api/v1/inventory/stock/adjust
- POST /api/v1/inventory/stock/transfer
- GET /api/v1/inventory/stock/movements?productId=
