# Domain — Human Resources (Bounded Context)

## Bounded Context: Human Resources

**Ubicación**: `com.luxury.hr`
**Esquema DB**: `hr.*`
**Dueño del contexto**: HR Module

---

## Aggregate Roots

### Employee
- **ID**: `EmployeeId` (UUID)
- **Entidades**: `Employee`, `Contract`, `Document`
- **Value Objects**: `EmployeeCode`, `FullName`, `Salary`, `Position`, `Department`
- **Domain Events**: `EmployeeHired`, `EmployeeTerminated`, `SalaryUpdated`
- **Reglas**:
  - Employee code es único por compañía
  - Email es único por compañía
  - Un empleado inactivo no puede registrar attendance
  - La terminación es suave (soft delete, datos retenidos)

### Leave
- **ID**: `LeaveId` (UUID)
- **Entidades**: `LeaveRequest`
- **Value Objects**: `LeaveType` (vacation, sick, personal, maternity), `DateRange`
- **Domain Events**: `LeaveRequested`, `LeaveApproved`, `LeaveRejected`
- **Reglas**:
  - Un empleado no puede tener dos leaves que se solapen
  - Leave tipo sick no requiere aprobación (notificación solamente)
  - Los días de vacaciones se calculan según el balance del empleado

### Payroll
- **ID**: `PayrollId` (UUID)
- **Entidades**: `PayrollRun`, `Payslip`, `Deduction`
- **Value Objects**: `PayrollPeriod`, `NetPay`, `GrossPay`
- **Domain Events**: `PayrollProcessed`, `PayslipGenerated`
- **Reglas**:
  - Nómina se procesa una vez por período
  - Un empleado debe tener attendance completa para payroll
  - Las deducciones se aplican antes de impuestos (según configuración local)

---

## Invariantes del Contexto

- El balance de vacaciones no puede ser negativo
- Un empleado no puede registrar attendance en dos sucursales el mismo día
- El payroll no puede procesarse si hay leaves sin aprobar del período

## Límites del Contexto

**Comunica con:**
- Notifications → publica eventos para aprobaciones de leave
- (Independiente del resto del ERP para aislamiento de datos)

**No le pertenece:**
- Usuarios del sistema (pertenecen a Identity)
- Roles y permisos (pertenecen a Identity)
