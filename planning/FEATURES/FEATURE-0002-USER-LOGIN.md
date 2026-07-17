# FEATURE-0002: Inicio de Sesión de Usuario

**Estado**: Pendiente
**Prioridad**: Crítica
**Épica**: EPIC-001 (Autenticación)
**Estimación**: 2 días

## Descripción
Autenticar usuarios existentes con correo electrónico + contraseña.

## Criterios de Aprobación
- [ ] Formulario de inicio de sesión con correo electrónico y contraseña
- [ ] Token de acceso JWT (15min) devuelto + token de actualización (7 días) en una cookie HTTP-only
- [ ] Mensaje de error para credenciales no válidas
- [ ] Bloqueo de cuenta después de 5 intentos fallidos (15 min de enfriamiento)
- [ ] "Recordarme" extiende el token de actualización a 30 días
- [ ] Redirigir al panel de control en caso de éxito
- [ ] Redirigir al inicio de sesión al acceder a rutas protegidas sin un token

## API
POST /api/v1/auth/login

## Notas
Límite de tasa: 5 intentos por minuto por IP.
