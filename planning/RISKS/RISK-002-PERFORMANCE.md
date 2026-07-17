# RISK-002: Rendimiento a Escala

**Estado**: Activo
**Probabilidad**: Media
**Impacto**: Alto
**Categoría**: Rendimiento

## Descripción
A medida que crecen los datos (millones de productos, pedidos, movimientos), el rendimiento de las consultas puede degradarse, especialmente para los movimientos de stock y registros de auditoría.

## Mitigación
- Índices diseñados desde el día 1 (ver documentación DATABASE/)
- Paginación en todos los endpoints de lista (máx. 100 por página)
- Paginación por conjunto de claves (keyset pagination) para grandes conjuntos de datos (futuro)
- Particionar stock_movements y audit_logs por fecha (mensual)
- Cachear lecturas frecuentes en Redis
- Monitorear consultas lentas con pg_stat_statements
- Revisiones periódicas con EXPLAIN ANALYZE

## Contingencia
Si el rendimiento se degrada:
1. Identificar consultas lentas a través del monitoreo
2. Añadir índices faltantes u optimizar consultas
3. Considerar réplicas de lectura para consultas de informes
4. Archivar datos antiguos (mover a almacenamiento en frío)
