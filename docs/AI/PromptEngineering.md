# AI — Prompt Engineering

## Philosophy
Cada interacción con el modelo de IA debe ser predecible, repetible y auditable. No improvisamos prompts.

## Principios

1. **Contexto primero** — Todo prompt comienza con el contexto necesario (rol, proyecto, reglas).
2. **Formato estructurado** — Usamos secciones claras: Contexto, Objetivo, Restricciones, Formato de salida.
3. **Un propósito por prompt** — No mezclar "crea X y además revisa Y".
4. **Ejemplos concretos** — Incluir ejemplos del resultado esperado (few-shot).
5. **Restricciones explícitas** — "No hagas X", "Sigue el patrón de Y".

## Estructura de Prompt

```markdown
## Rol
Eres un {role} experto en {technology}.

## Contexto
{Descripción del proyecto, archivos relevantes, reglas a seguir}

## Objetivo
{Qué debe lograr exactamente}

## Archivos a modificar
{Lista de archivos con paths exactos}

## Restricciones
- No hacer X
- Seguir patrón de Y
- No instalar nuevas dependencias

## Formato de salida
{Qué debe devolver: código, explicación, archivos completos}

## Ejemplo
{Input/Output esperado}
```

## Prompts en este proyecto

Ver `docs/PROMPTS/` para la biblioteca completa de prompts reutilizables.
