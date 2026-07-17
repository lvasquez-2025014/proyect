# Domain — CRM (Bounded Context)

## Bounded Context: CRM

**Ubicación**: `com.luxury.crm`
**Esquema DB**: `crm.*`
**Dueño del contexto**: CRM Module

---

## Aggregate Roots

### Contact
- **ID**: `ContactId` (UUID)
- **Entidades**: `Contact`, `Address`
- **Value Objects**: `Email`, `Phone`, `FullName`, `CompanyName`, `TaxId`
- **Domain Events**: `ContactCreated`, `ContactUpdated`, `ContactMerged`
- **Reglas**:
  - Email es único por compañía (pero opcional)
  - Un contacto puede tener N direcciones
  - Una dirección puede ser billing, shipping, o both
  - Merge de contactos transfiere todos los datos al superviviente

### Interaction
- **ID**: `InteractionId` (UUID)
- **Entidades**: — (entidad simple)
- **Value Objects**: `InteractionType` (call, email, meeting, note, task), `Direction`
- **Domain Events**: `InteractionLogged`
- **Reglas**:
  - Una interacción siempre pertenece a un contacto
  - Las interacciones son append-only (no se editan, solo se complementan)

### Segment
- **ID**: `SegmentId` (UUID)
- **Entidades**: `Segment`, `SegmentRule`
- **Value Objects**: `RuleCriteria`
- **Domain Events**: — (se recalcula periódicamente)
- **Reglas**:
  - Los segmentos son dinámicos (basados en reglas, no asignación manual)
  - Las reglas pueden combinar: fecha de compra, monto, frecuencia, ubicación, etiquetas

---

## Value Objects principales

| Value Object | Atributos | Validación |
|-------------|-----------|------------|
| `Email` | address | Formato email válido |
| `Phone` | number, countryCode | Formato según país |
| `FullName` | firstName, lastName | No vacío |
| `Address` | line1, line2, city, state, zip, country | line1 y país requeridos |
| `VipTier` | tier (standard, silver, gold, platinum) | — |

---

## Invariantes del Contexto

- Un contacto inactivo no puede crear nuevas órdenes
- El merge de contactos es irreversible
- Las interacciones no se eliminan (solo se ocultan)

## Límites del Contexto

**Comunica con:**
- Sales → recibe `OrderCreatedEvent` para actualizar purchase history
- Notifications → publica eventos para triggers (birthday, inactivity)

**No le pertenece:**
- Órdenes del cliente (pertenecen a Sales)
- Facturas del cliente (pertenecen a Billing)
