# Engineering Principles

> Estas reglas son innegociables. Cada línea de código, cada PR, cada módulo debe alinearse con estos principios. Si una decisión los contradice, la decisión está mal.

---

## 1. Calidad sobre velocidad

Priorizamos la mantenibilidad y corrección del código sobre la velocidad de entrega.

**Reglas concretas:**
- No se aceptan "soluciones rápidas" (`// TODO: fix later`, `// HACK:`, `// temporary`) sin un ticket vinculado y fecha de remediación.
- Toda deuda técnica se documenta y se prioriza en el roadmap.
- Un PR que introduce más deuda técnica de la que resuelve será rechazado.
- Las code reviews no se saltan por "urgencia". La urgencia es síntoma de mala planificación.

**Ejemplo:** Si hay presión para entregar una feature rápido y la opción rápida implica duplicar lógica de negocio, la respuesta es "no". Se refactoriza lo necesario primero.

---

## 2. Un único origen de verdad (Single Source of Truth)

Cada pieza de lógica de negocio, cada modelo de datos, cada regla de validación existe exactamente en un lugar.

**Reglas concretas:**
- La lógica de negocio vive en `domain/`, no en controladores, DTOs, o frontend.
- Las validaciones de negocio están en el backend (el frontend solo valida UX, no negocio).
- No duplicar esquemas de validación entre frontend y backend — usar schemas compartidos (`packages/validations`).
- No copiar datos entre módulos — consultar la API del módulo propietario.
- No derivar una tabla de otra — usar vistas materializadas o CQRS si se necesita una representación diferente.

**Ejemplo:** El cálculo de `available = quantity - reserved` se define UNA vez en la base de datos (columna generada) y no se replica en cinco services de Java.

---

## 3. Documentar primero (Documentation First)

Ningún módulo, endpoint, o entidad se implementa sin su especificación funcional completa primero.

**Reglas concretas:**
- Antes de escribir código de un módulo nuevo, debe existir su SPECIFICATIONS/{modulo}.md aprobado.
- Antes de crear un endpoint, debe existir su definición en API/{modulo}.md.
- Antes de crear una tabla, debe existir su definición en DATABASE/{tabla}.md.
- Antes de crear una pantalla, debe existir su spec en UI/{pantalla}.md.
- Las PRs que introducen cambios no documentados son rechazadas.
- La documentación se actualiza en el mismo PR que el código.

**Ejemplo:** No se puede empezar a codificar el módulo de Compras hasta que `SPECIFICATIONS/PURCHASES.md` esté escrito y revisado.

---

## 4. API estable (API Stability)

Las APIs públicas son contratos. Cambiarlas tiene costo y debe justificarse.

**Reglas concretas:**
- Los endpoints públicos versionados (`/api/v1/`) no pueden romperse. Los cambios incompatibles requieren nueva versión.
- Los campos en respuestas JSON no se eliminan — si es necesario, se deprecan con `@deprecated` y se eliminan en la siguiente versión mayor.
- Los campos en requests pueden ser requeridos u opcionales nuevos, pero no se cambia el tipo de un campo existente.
- Cada breaking change debe documentarse en un ADR con justificación explícita.
- Los clientes (frontend, integraciones) deben tener al menos un ciclo de release para migrar.

**Ejemplo:** Si `POST /api/v1/products` recibe `category_id` como UUID y queremos cambiarlo a objeto anidado, se crea `POST /api/v2/products` y se depreca v1.

---

## 5. Seguridad por defecto (Secure by Default)

Cada nuevo endpoint, componente, o funcionalidad debe considerar seguridad desde el diseño, no como un afterthought.

**Reglas concretas:**
- Todo endpoint nuevo requiere autenticación (`@PreAuthorize`, `requireAuth`).
- No existe el concepto "lo añadimos después" para autorización.
- Todo input de usuario se valida en el backend (el frontend puede validar también, pero no es suficiente).
- No se almacenan secrets, tokens, ni credenciales en el repositorio.
- Las consultas a base de datos usan siempre parámetros vinculados (nunca concatenación de strings).
- Las respuestas de error nunca exponen stack traces, internals de la DB, o información sensible.
- Registro de acceso (audit log) para toda operación de escritura.

**Ejemplo:** Un endpoint `GET /api/v1/customers/{id}` no solo verifica autenticación — también verifica que el usuario tenga permiso para ver ese cliente (misma compañía, rol suficiente).

---

## 6. Observabilidad (Observability)

Los sistemas en producción deben ser comprensibles sin necesidad de reproducir bugs localmente.

**Reglas concretas:**
- Todo módulo importante genera logs estructurados (JSON) con contexto relevante (userId, tenantId, correlationId, duración).
- Los errores se registran con nivel ERROR (no WARN, no INFO). Los eventos esperados (404) no son errores.
- Las operaciones lentas (>500ms) se loguean con WARN.
- Los endpoints críticos exponen métricas (contadores, histogramas) via Actuator/Prometheus.
- Las excepciones no controladas se capturan globalmente y se envían a Sentry.
- Las trazas distribuidas (correlationId) se propagan del frontend al backend.

**Ejemplo:** Cuando un pedido falla al confirmarse, el log debe incluir: userId, orderId, tenantId, el paso exacto donde falló, y el stack trace — todo en una sola línea JSON.

---

## 7. Escalabilidad (Designed for Scale)

Diseñar pensando en que el sistema crecerá: más usuarios, más empresas, más datos, más módulos.

**Reglas concretas:**
- Toda lista de datos usa paginación server-side (no cargar todo y filtrar en cliente).
- Las queries se optimizan con índices desde la primera migración.
- Las operaciones pesadas (reportes, PDFs, emails) son asíncronas.
- No se almacenan archivos en la base de datos (usar S3 / MinIO).
- El aislamiento multi-tenant (company_id) se aplica en todas las queries, no solo en las que "parecen necesitarlo".
- Los módulos se diseñan para ser independientes — nada impide que un módulo se extraiga a un servicio separado.

**Ejemplo:** La tabla `stock_movements` tendrá millones de filas con el tiempo. Desde el día 1 tiene índices en `(product_id, created_at DESC)` y `(created_at)` para consultas de auditoría.

---

## 8. Experiencia del desarrollador (Developer Experience)

El código debe ser comprensible para cualquier desarrollador del equipo, incluso meses después de escrito.

**Reglas concretas:**
- El código comunica intención. Si necesita un comentario para explicar qué hace, el nombre está mal.
- Los nombres de variables, funciones, y clases son descriptivos. No abreviaturas crípticas.
- Los métodos tienen una sola responsabilidad y máximo 30 líneas (salvo casos justificados).
- Los componentes React tienen máximo 200 líneas (salvo casos justificados).
- Las PRs son pequeñas y enfocadas (ideal < 300 líneas modificadas).
- El setup del proyecto debe funcionar con < 3 comandos (ver README).
- Los tests se ejecutan en < 5 minutos en CI.

**Ejemplo:** Si un desarrollador nuevo puede leer `ProductApplicationService.create()` y entender todo el flujo sin abrir otros archivos, cumple. Si necesita saltar entre 7 clases para entender qué hace, falla.

---

## Aplicación de los Principios

| Situación | Principio Aplicado |
|-----------|-------------------|
| "Lo deployamos rápido y lo arreglamos después" | 1 — Calidad sobre velocidad |
| "Necesito este campo calculado también en el frontend" | 2 — Un único origen de verdad |
| "Podemos empezar a codificar, la spec la escribimos después" | 3 — Documentar primero |
| "Cambiamos este campo de string a int" | 4 — API estable |
| "Este endpoint interno no necesita auth" | 5 — Seguridad por defecto |
| "El bug no se reproduce en local" | 6 — Observabilidad |
| "Son solo 100 productos, podemos cargarlos todos" | 7 — Escalabilidad |
| "Es complejo pero funciona, aunque cueste entenderlo" | 8 — Experiencia del desarrollador |

---

> Estos principios se revisan cada 6 meses. Cualquier cambio requiere discusión y consenso del equipo.
