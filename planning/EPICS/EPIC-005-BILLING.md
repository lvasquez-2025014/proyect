# EPIC-005: Facturación y Pagos

**Estado**: Pendiente
**Prioridad**: Alta
**Dependencias**: EPIC-001, EPIC-004

## Descripción
Facturación, seguimiento de pagos, notas de crédito y gestión de impuestos para múltiples jurisdicciones.

## Objetivos
- Generación de facturas (desde pedidos y manual)
- Registro de pagos (totales y parciales)
- Notas de crédito para devoluciones
- Soporte de impuestos de múltiples jurisdicciones
- Reconciliación de pagos
- Facturas recurrentes (suscripciones)

## Criterios de Aprobación
- [ ] Auto-generar factura desde un pedido entregado
- [ ] Crear facturas manuales (sin pedido)
- [ ] Registrar pagos (totales y parciales)
- [ ] Estado de la factura: borrador → enviada → pagada/atrasada/cancelada
- [ ] Las notas de crédito reducen el saldo de la factura
- [ ] Cálculo de impuestos por línea (soporta múltiples tasas de impuestos)
- [ ] Detección y notificaciones de facturas atrasadas
- [ ] Generación de facturas recurrentes (semanal/mensual/anual)
- [ ] Generación de PDF de la factura
- [ ] Numeración de facturas autogenerada por empresa

## Dependencias de la Épica
EPIC-001, EPIC-004

## Esfuerzo Estimado
2-3 sprints
