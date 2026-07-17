# FEATURE-0001: Crear Empresa (Onboarding)

**Estado**: Pendiente
**Prioridad**: Crítica
**Épica**: EPIC-001 (Autenticación)
**Estimación**: 3 días

## Descripción
Flujo de usuario por primera vez: registrar una nueva empresa y convertirse en su administrador.

## Criterios de Aprobación
- [ ] Formulario de registro: nombre de la empresa, correo del administrador, contraseña, nombre del administrador
- [ ] Empresa creada con la configuración predeterminada (USD, UTC, Inglés)
- [ ] Usuario administrador creado con rol ADMIN
- [ ] Sucursal predeterminada creada (Oficina Principal)
- [ ] Almacén predeterminado creado bajo la sucursal principal
- [ ] Correo electrónico de bienvenida enviado
- [ ] Usuario automáticamente inicia sesión después del registro
- [ ] Correo electrónico duplicado rechazado

## Reglas de Validación
- Nombre de la empresa: obligatorio, 2-255 caracteres
- Correo electrónico: formato válido, único
- Contraseña: mín. 8 caracteres, 1 mayúscula, 1 número
- Nombre del administrador: obligatorio, 2-100 caracteres

## Notas
Esta es la primera característica con la que interactúa un usuario. Debe estar bien pulida.
