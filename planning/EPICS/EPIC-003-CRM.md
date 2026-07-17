# EPIC-003: CRM (Gestión de Relaciones con los Clientes)

**Estado**: Pendiente
**Prioridad**: Alta
**Dependencias**: EPIC-001

## Descripción
Gestión de clientes con características de "clienteling" de lujo: perfiles VIP, preferencias, historial de compras, interacciones y segmentación.

## Objetivos
- Gestión de contactos (individuo + organización)
- Soporte de múltiples direcciones (facturación, envío)
- Registro de interacciones (llamadas, correos electrónicos, reuniones, notas, tareas)
- Perfiles VIP con preferencias (tallas, colores, materiales, alergias)
- Historial de compras agregado del módulo de Ventas
- Segmentos dinámicos de clientes
- Búsqueda y fusión de clientes

## Criterios de Aprobación
- [ ] Crear/editar contactos individuales y de organización
- [ ] Múltiples direcciones por contacto con tipo (facturación/envío/ambos)
- [ ] Registrar interacciones con tipo, asunto, descripción, dirección
- [ ] Preferencias VIP con campos personalizables
- [ ] Vista del historial de compras (leído desde los eventos de Ventas)
- [ ] Segmentos dinámicos basados en reglas (gasto, frecuencia, ubicación)
- [ ] Fusionar contactos duplicados (todos los datos relacionados se transfieren)
- [ ] Buscar por nombre, correo electrónico, teléfono, empresa
- [ ] Asignar contacto a un asociado de ventas

## Dependencias de la Épica
EPIC-001, EPIC-004 (para el historial de compras a través de eventos)

## Esfuerzo Estimado
2-3 sprints
