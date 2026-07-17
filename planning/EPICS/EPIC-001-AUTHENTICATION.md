# EPIC-001: Autenticación y Multi-inquilino

**Estado**: Pendiente
**Prioridad**: Crítica
**Dependencias**: Ninguna (épica base)

## Descripción
Implementar el sistema de autenticación con JWT, aislamiento multi-inquilino, control de acceso basado en roles y registro de empresas.

## Objetivos
- Los usuarios pueden registrar una nueva empresa y convertirse en administradores
- Los usuarios pueden iniciar sesión con correo electrónico + contraseña
- Tokens de acceso JWT (15min) + tokens de actualización (7 días)
- Aislamiento de datos multi-inquilino (company_id en todas las consultas)
- Control de acceso basado en roles (RBAC) con 6 roles
- Flujo de restablecimiento de contraseña
- Bloqueo de cuenta después de 5 intentos fallidos

## Criterios de Aprobación
- [ ] POST /api/v1/auth/register crea la empresa + usuario administrador
- [ ] POST /api/v1/auth/login devuelve los tokens JWT
- [ ] GET /api/v1/auth/me devuelve el perfil del usuario autenticado
- [ ] Todos los endpoints devuelven 401 sin un token válido
- [ ] Los usuarios solo pueden acceder a los datos de su propia empresa
- [ ] Permisos de roles aplicados en todos los endpoints de mutación
- [ ] La cuenta se bloquea después de 5 intentos fallidos de inicio de sesión
- [ ] Correo electrónico de restablecimiento de contraseña enviado y el token expira después de 1 hora
- [ ] Rotación del token de actualización (el token antiguo se invalida al actualizar)
- [ ] Límite de tasa: 5 intentos de inicio de sesión por minuto por IP

## Notas Técnicas
- JWT con RS256 (claves asimétricas)
- Hibernate @TenantId o Spring Filter para multi-inquilino
- BCrypt para el hash de contraseñas (factor de costo 12)

## Dependencias de la Épica
Ninguna (capa base)

## Esfuerzo Estimado
2-3 sprints
