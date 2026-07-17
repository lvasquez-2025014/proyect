# EPIC-004: Gestión de Ventas y Pedidos

**Estado**: Pendiente
**Prioridad**: Alta
**Dependencias**: EPIC-001, EPIC-002 (Inventario)

## Descripción
Ciclo de ventas completo: presupuestos, pedidos, cumplimiento, devoluciones. Se integra con Inventario para la reserva de stock y con CRM para el historial del cliente.

## Objetivos
- Creación de presupuestos y conversión a pedidos
- Ciclo de vida completo del pedido (borrador → confirmado → enviado → entregado)
- Reserva de stock al confirmar el pedido
- Gestión de descuentos con flujos de aprobación
- Seguimiento del estado del pedido
- Devoluciones y notas de crédito

## Criterios de Aprobación
- [ ] Crear presupuestos con productos, cantidades, precios
- [ ] Convertir presupuesto en pedido (borrador)
- [ ] Crear pedidos directamente
- [ ] Confirmar pedido → reservar stock en el Inventario
- [ ] Procesar envíos parciales
- [ ] Cancelar pedido → liberar stock en el Inventario
- [ ] Aplicar descuentos por línea y por pedido
- [ ] Los descuentos por encima del umbral requieren la aprobación del gerente
- [ ] Las devoluciones crean notas de crédito
- [ ] Estado del pedido visible en tiempo real
- [ ] Eventos de dominio publicados: OrderCreated, OrderConfirmed, OrderShipped, OrderDelivered, OrderCancelled

## Dependencias de la Épica
EPIC-001, EPIC-002

## Esfuerzo Estimado
3-4 sprints
