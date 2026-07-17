# RISK-006: Brecha de Seguridad

**Estado**: Activo
**Probabilidad**: Baja
**Impacto**: Crítico
**Categoría**: Seguridad

## Descripción
El compromiso de JWT, inyección SQL, XSS o exposición de datos podrían exponer los datos de los clientes.

## Mitigación
- JWT con RS256 (claves asimétricas) — los tokens de actualización se rotan
- Todas las entradas validadas (@Valid, nunca confiar en el cliente)
- Solo consultas parametrizadas (sin concatenación SQL)
- Encabezados CSP + auto-escape de React (prevención de XSS)
- CORS restringido a orígenes conocidos
- Límite de tasa (rate limiting) en todos los endpoints
- El registro de auditoría rastrea todos los accesos a datos (detección)
- Los secretos nunca están en el repositorio (variables de entorno)
- Escaneo regular de dependencias (Dependabot)
- Pruebas de penetración antes de v1.0

## Contingencia
Si ocurre una brecha:
1. Revocar todos los tokens inmediatamente
2. Identificar el punto de entrada y cerrarlo
3. Notificar a los usuarios afectados (según el GDPR)
4. Auditoría de seguridad completa
