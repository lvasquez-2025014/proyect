# RISK-003: Dependencia de un Solo Desarrollador

**Estado**: Activo
**Probabilidad**: Alta
**Impacto**: Alto
**Categoría**: Equipo

## Descripción
Proyecto de un solo desarrollador. Si el desarrollador no está disponible (enfermedad, agotamiento, otros compromisos), el progreso del proyecto se detiene por completo.

## Mitigación
- Documentación exhaustiva (toda esta carpeta docs/)
- Código auto-documentado (nomenclatura, estructura, convenciones)
- Todas las decisiones registradas en ADR/ y DECISIONS/
- Prompts de IA en PROMPTS/ permiten que otro desarrollador continúe
- CI/CD asegura la calidad del código sin importar quién hace commit
- Docker Compose para un entorno de desarrollo sin necesidad de configuración

## Contingencia
Si el desarrollador deja de estar disponible:
1. Cualquier desarrollador de Java/TypeScript puede incorporarse vía docs/17-CONTRIBUTING.md
2. Los asistentes de IA pueden continuar el desarrollo utilizando la biblioteca PROMPTS/
3. Las decisiones de arquitectura están documentadas (sin conocimiento tribal)
