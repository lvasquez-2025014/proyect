# AI — Providers

## Modelos

| Proveedor | Modelo | Uso | Costo |
|-----------|--------|-----|-------|
| DeepSeek | deepseek-v4-flash-free | Desarrollo diario, generación de código | Gratuito |
| OpenAI | GPT-4o | Tareas complejas, revisión de seguridad | Bajo |
| Anthropic | Claude Sonnet 4 | Refactorización, análisis de impacto | Bajo |

## Estrategia de Selección

| Tarea | Modelo Recomendado |
|-------|-------------------|
| Generar CRUD simple | DeepSeek Flash |
| Arquitectura compleja | GPT-4o / Claude Sonnet |
| Code review | DeepSeek Flash |
| Refactor grande | Claude Sonnet |
| Seguridad / SQL | GPT-4o |
| Documentación | DeepSeek Flash |
| Testing | DeepSeek Flash |

## Reglas

1. **Preferir Flash** para el 80% de las tareas (rápido, suficiente calidad).
2. **Usar modelos grandes** solo cuando Flash falla o la tarea es crítica.
3. **No mezclar modelos** en una misma tarea (inconsistencia de estilo).
4. **Documentar** si un modelo específico fue necesario y por qué (para aprendizaje).

## Configuración

```json
{
  "deepseek": {
    "model": "deepseek-v4-flash-free",
    "temperature": 0.3,
    "max_tokens": 8192
  },
  "gpt4o": {
    "model": "gpt-4o",
    "temperature": 0.2,
    "max_tokens": 16384
  },
  "claude": {
    "model": "claude-sonnet-4-20250514",
    "temperature": 0.2,
    "max_tokens": 8192
  }
}
```
