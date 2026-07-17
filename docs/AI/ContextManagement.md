# AI — Context Management

## Estrategia

La IA necesita contexto relevante para generar código de calidad. Este documento define cómo gestionamos el contexto en cada interacción.

## Niveles de Contexto

| Nivel | Contenido | Cuándo usarlo |
|-------|-----------|--------------|
| **Proyecto** | `ENGINEERING_PRINCIPLES.md`, `02-ARCHITECTURE.md`, `16-AI_RULES.md` | Primera interacción de la sesión |
| **Módulo** | `SPECIFICATIONS/{modulo}.md`, `DOMAIN/{modulo}.md`, `API/{modulo}.md` | Al trabajar en un módulo específico |
| **Tarea** | `PROMPTS/{tarea}.md`, archivos afectados | Por cada tarea concreta |
| **Incremental** | Diferencias desde la última interacción | En correcciones y refinamientos |

## Reglas de Contexto

1. **Siempre empezar con el nivel Proyecto** al iniciar una sesión nueva.
2. **No sobrecargar** — incluir solo los archivos relevantes a la tarea.
3. **Preferir secciones específicas** sobre archivos completos (ej: solo la sección de un endpoint de API/{modulo}.md).
4. **Actualizar el contexto** cuando la IA refiere a código que ya no es el actual.
5. **Usar rutas absolutas** desde la raíz del proyecto.

## Ejemplo de Contexto Inicial

```
Contexto del proyecto: docs/ENGINEERING_PRINCIPLES.md, docs/16-AI_RULES.md
Arquitectura: docs/02-ARCHITECTURE.md (sección Modular Monolith)
Módulo: docs/SPECIFICATIONS/INVENTORY.md, docs/DOMAIN/Inventory.md, docs/API/inventory.md
```
