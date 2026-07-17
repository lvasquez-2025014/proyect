# FEATURE-0005: Crear Pedido

**Estado**: Pendiente
**Prioridad**: Alta
**Épica**: EPIC-004 (Ventas)
**Estimación**: 5 días

## Descripción
Crear un pedido de ventas con productos, cantidades, precios y descuentos. Gestión completa del ciclo de vida del pedido.

## Criterios de Aprobación
- [ ] Seleccionar cliente (del CRM)
- [ ] Añadir productos con cantidades
- [ ] Soportar variantes de productos
- [ ] Precio unitario por línea (anulable)
- [ ] Descuentos por línea y por pedido (porcentaje o fijo)
- [ ] Aprobación de descuento si está por encima del umbral
- [ ] Totales del pedido: subtotal, descuento, impuestos, total final
- [ ] Seguimiento del estado del pedido (borrador → confirmado → ...)
- [ ] Número de pedido auto-generado
- [ ] Notas y dirección de envío
- [ ] Crear pedido como borrador
- [ ] Confirmar pedido (reserva stock, actualiza CRM)

## Endpoints de la API
- POST /api/v1/sales/orders
- GET /api/v1/sales/orders (paginado, filtrable)
- GET /api/v1/sales/orders/{id}
- PATCH /api/v1/sales/orders/{id}/status
- POST /api/v1/sales/orders/{id}/cancel

## UI
- Formulario de creación de pedido con selector de cliente, selector de productos, editor de líneas
- Vista de detalle del pedido con línea de tiempo del estado
- Lista de pedidos con filtros y búsqueda
