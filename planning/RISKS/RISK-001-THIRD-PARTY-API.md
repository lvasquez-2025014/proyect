# RISK-001: Cambios en APIs de Terceros

**Estado**: Activo
**Probabilidad**: Media
**Impacto**: Alto
**Categoría**: Integración

## Descripción
Las APIs de terceros (WhatsApp, Instagram, Facebook, Stripe) pueden cambiar sus interfaces, desaprobar endpoints o modificar los requisitos de autenticación.

## Mitigación
- Envolver todas las integraciones de terceros detrás de una abstracción (patrón puerto/adaptador)
- Nunca llamar a APIs de terceros directamente desde las capas de dominio o aplicación
- Utilizar módulos específicos de integración que se puedan actualizar de forma independiente
- Monitorear los registros de cambios de los proveedores y los avisos de desaprobación
- Bloquear las versiones de los clientes API en las dependencias

## Contingencia
Si una integración falla:
1. Identificar el cambio disruptivo (breaking change) en la documentación del proveedor
2. Actualizar el adaptador de integración (cambio aislado)
3. Ejecutar pruebas de integración
4. Desplegar sin tocar los módulos principales
