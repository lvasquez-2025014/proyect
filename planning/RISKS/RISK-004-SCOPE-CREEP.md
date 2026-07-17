# RISK-004: Corrupción del Alcance (Scope Creep)

**Estado**: Activo
**Probabilidad**: Alta
**Impacto**: Medio
**Categoría**: Proceso

## Descripción
Luxury ERP tiene muchas características potenciales. Sin disciplina, el proyecto puede crecer más allá de lo factible para un desarrollador en solitario, llevando a módulos inacabados y agotamiento.

## Mitigación
- Hoja de ruta estricta (docs/15-ROADMAP.md) con entrega en fases
- Backlog priorizado (planning/BACKLOG/backlog.md)
- Cada nueva característica debe justificarse frente a la visión (docs/00-PROJECT-VISION.md)
- Regla de "documentar primero": la especificación debe existir antes que el código
- Principio YAGNI: construir lo que se necesita ahora, no lo que se podría necesitar después
- Revisión mensual de la hoja de ruta: reducir el alcance antes de añadir

## Contingencia
Si el alcance crece más allá de la capacidad:
1. Revisar la hoja de ruta y posponer características no críticas
2. Enfocarse en módulos principales (Inventario, Ventas, Facturación, CRM)
3. Diferir IA, integraciones y características avanzadas para fases posteriores
