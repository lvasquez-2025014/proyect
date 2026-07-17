# Domain — Identity & Access (Bounded Context)

## Bounded Context: Identity & Access

**Ubicación**: `com.luxury.identity` (parte de Shared Kernel)
**Esquema DB**: `public.*` (tablas compartidas)
**Dueño del contexto**: Shared Kernel / Auth Module

---

## Aggregate Roots

### User
- **ID**: `UserId` (UUID)
- **Entidades**: `User`, `UserBranch`
- **Value Objects**: `Email`, `PasswordHash`, `FullName`, `Phone`, `Role`
- **Domain Events**: `UserLoggedIn`, `UserCreated`, `UserDeactivated`, `PasswordChanged`
- **Reglas**:
  - Email es único por compañía
  - Password debe cumplir política de complejidad (8+ chars, mayúscula, número)
  - Tras 5 intentos fallidos, cuenta bloqueada 15 minutos
  - Un usuario puede pertenecer a una o más sucursales

### Company (Tenant)
- **ID**: `CompanyId` (UUID)
- **Entidades**: `Company`, `Branch`
- **Value Objects**: `CompanyName`, `TaxId`, `CompanySettings`, `SubscriptionPlan`
- **Domain Events**: `CompanyRegistered`, `CompanySettingsUpdated`, `CompanyDeactivated`
- **Reglas**:
  - Cada compañía es un tenant aislado (company_id en todas las tablas)
  - La configuración incluye moneda, timezone, idioma, formato de fecha
  - Una compañía no puede eliminarse hasta 90 días después de desactivarse

---

## Roles del Sistema

| Rol | Nivel | Descripción |
|-----|-------|-------------|
| `SUPER_ADMIN` | Sistema | Acceso total a todas las compañías |
| `ADMIN` | Compañía | Configuración, usuarios, todos los módulos |
| `MANAGER` | Sucursal | Gestión de sucursal, reportes, aprobaciones |
| `SALES` | Sucursal | Ventas, CRM, cotizaciones |
| `WAREHOUSE` | Sucursal | Inventario, recepción, movimientos |
| `VIEWER` | Compañía | Solo lectura |

---

## Invariantes del Contexto

- Una compañía debe tener al menos un usuario ADMIN
- Un usuario no eliminable si es el único ADMIN de la compañía
- El email de login es único global (no solo por compañía)

## Límites del Contexto

**Comunica con:**
- Todos los contextos → provee el tenant_id y user_id actual
- Notifications → publica eventos de seguridad (login fallido, nueva IP)

**No le pertenece:**
- Preferencias de usuario del ERP (pertenecen a UI/settings)
- Datos de empleados (pertenecen a HR)
