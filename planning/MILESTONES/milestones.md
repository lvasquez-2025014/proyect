# Hitos

| Hito | Fecha Objetivo | Entregable | Dependencias |
|-----------|-------------|-------------|-------------|
| M1: Autenticación Completa | Semana 2 | Login, registro, JWT, multi-inquilino, RBAC | — |
| M2: Inventario Completo | Semana 6 | Productos, stock, movimientos, búsqueda | M1 |
| M3: CRM Completo | Semana 8 | Contactos, interacciones, perfiles VIP | M1 |
| M4: Ventas Completas | Semana 10 | Pedidos, presupuestos, ciclo de vida del pedido, eventos de stock | M2, M3 |
| M5: Facturación Completa | Semana 12 | Facturas, pagos, notas de crédito, PDF | M4 |
| M6: Lanzamiento MVP | Semana 12 | Lanzamiento v0.1 | M1-M5 |
| M7: Lanzamiento v0.2 | Q4 2026 | Núcleo completo del negocio | M6 |
| M8: Lanzamiento v0.3 | Q1 2027 | Características avanzadas | M7 |
| M9: Lanzamiento v1.0 | Q2 2027 | Listo para producción | M8 |

## Seguimiento
Cada hito tiene un Hito de GitHub con los problemas (issues) asociados.

## Criterios de Aprobación para M6 (Lanzamiento MVP)
- [ ] Todas las operaciones CRUD principales funcionan
- [ ] Autenticación y autorización probadas
- [ ] Aislamiento multi-inquilino verificado
- [ ] Movimientos de stock auditables
- [ ] Interfaz de usuario básica funcional (no solo API)
- [ ] Pipeline CI pasando correctamente
- [ ] Configuración de Docker Compose funcionando
- [ ] Estrategia de respaldo documentada
