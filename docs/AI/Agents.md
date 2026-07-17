# AI — Agents

## Estrategia

Agentes de IA autónomos para tareas específicas dentro del ERP. Cada agente tiene un propósito limitado, supervisión humana opcional, y alcance restringido.

## Agentes Definidos

### Stock Agent
- **Propósito**: Monitorear niveles de stock y generar sugerencias de reorden
- **Trigger**: Diario (cron) o bajo demanda
- **Acciones**:
  - Identificar productos por debajo del reorder point
  - Generar sugerencias de PO
  - Detectar excesos de stock y sugerir transferencias o promociones
- **Supervisión**: Sugerencias requieren aprobación humana

### Client Agent
- **Propósito**: Analizar cartera de clientes y sugerir acciones
- **Trigger**: Semanal
- **Acciones**:
  - Identificar clientes inactivos (>90 días sin compra)
  - Sugerir next-best-action para cada segmento
  - Detectar clientes VIP en riesgo de churn
- **Supervisión**: Reporte enviado al CRM manager

### Invoice Agent
- **Propósito**: Gestionar ciclo de facturación
- **Trigger**: Eventos + cron diario
- **Acciones**:
  - Generar facturas desde órdenes entregadas
  - Enviar recordatorios de facturas vencidas
  - Conciliar pagos recibidos con facturas abiertas
- **Supervisión**: Automático con alertas de excepción

### Report Agent
- **Propósito**: Generar reportes periódicos
- **Trigger**: Configurable (diario, semanal, mensual)
- **Acciones**:
  - Compilar KPIs de cada módulo
  - Generar PDF/Excel
  - Distribuir por email a destinatarios configurados
- **Supervisión**: Sin supervisión (reportes pre-aprobados)

## Arquitectura

```
Scheduler (cron / eventos)
  → Agent Orchestrator
    → Agent.execute(context)
      → Tool: Query DB
      → Tool: Read API
      → Tool: Execute action
      → Tool: Send notification
    → Result: Report / Suggestion / Action log
  → Audit: Agent run logged
```

## Reglas para Agentes

1. **Un agente = una responsabilidad** — no crear agentes multipropósito.
2. **Toda acción es reversible o requiere aprobación** — ningún agente elimina datos sin supervisión.
3. **Todo agente genera un log** de cada ejecución (timestamp, input, output, decisiones).
4. **Límite de acciones por ejecución** — 10 acciones máximo, luego pausa y reporta.
5. **Los agentes no modifican configuraciones** del sistema (solo datos operativos).
6. **Un agente no puede crear otro agente** ni modificar sus propias reglas.

## Futuro

- Agente de **conciliación bancaria**: match automático de movimientos bancarios con facturas
- Agente de **pricing**: sugerir ajustes de precio basados en demanda y estacionalidad
- Agente de **logística**: optimizar rutas de entrega y consolidar envíos
- Agente de **detección de fraude**: analizar patrones anómalos en tiempo real
