# AI — Memory

## Estrategia

El modelo de IA no tiene memoria persistente entre sesiones. Este documento define cómo preservamos y transferimos el estado entre interacciones.

## Mecanismos de Memoria

### Archivos de Estado
Para tareas largas (>1 interacción), creamos un archivo de estado en `docs/PROMPTS/STATE/`:

```json
{
  "task_id": "PROJ-42",
  "objective": "Implement inventory module",
  "completed": ["products CRUD", "categories"],
  "in_progress": "stock management",
  "pending": ["variants", "lots"],
  "decisions": [
    "use UUID primary keys",
    "soft delete with deleted_at"
  ],
  "blockers": []
}
```

### Git como Memoria
- Cada interacción significativa genera un commit
- El diff del commit es el contexto incremental
- `git log --oneline -10` da el resumen de lo último que se hizo

### Documentación como Memoria
- Las decisiones se registran en `docs/ADR/` o `docs/DECISIONS/`
- El código implementado se refleja en `docs/API/`, `docs/DATABASE/`, `docs/UI/`
- Re-leer la documentación actualizada es el reset de contexto

## Reglas

1. **Fin de sesión**: Dejar un resumen de lo completado y lo pendiente.
2. **Inicio de sesión**: Leer `git log --oneline -5` + docs/ actualizados del área a trabajar.
3. **Decisiones importantes**: Registrar inmediatamente en ADR o DECISIONS.
4. **Cambios de plan**: Actualizar el roadmap (15-ROADMAP.md) cuando una fase se completa o se reprioriza.
