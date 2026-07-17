# RISK-005: Pérdida o Corrupción de Datos

**Estado**: Activo
**Probabilidad**: Baja
**Impacto**: Crítico
**Categoría**: Datos

## Descripción
La corrupción de la base de datos, eliminación accidental o falla de migración podrían causar pérdida de datos.

## Mitigación
- Copias de seguridad diarias automatizadas con 30 días de retención
- Copia de seguridad almacenada en una región/ubicación diferente
- Restauración de prueba mensual (verificar la integridad de la copia de seguridad)
- Migraciones Flyway versionadas y probadas antes de aplicar
- Transacciones de solo lectura para consultas
- Registro de auditoría de solo adición (no se puede modificar)
- Eliminación suave (los datos nunca se eliminan realmente)

## Contingencia
Si ocurre pérdida de datos:
1. Restaurar desde la última copia de seguridad
2. Reproducir registros de auditoría para reconstruir transacciones perdidas
3. Investigar la causa raíz y prevenir recurrencias
4. Notificar a los usuarios afectados
