# Prompt: Create Batch Job

```
Create a scheduled batch job for {task}.

## Location
services/backend/src/main/java/com/luxury/{module}/infrastructure/scheduler/{Task}Scheduler.java

## Pattern
@Component
public class {Task}Scheduler {
    private final {Service} service;
    private final Logger log = LoggerFactory.getLogger(getClass());

    // Daily at 2 AM
    @Scheduled(cron = "0 0 2 * * *", zone = "UTC")
    public void executeTask() {
        log.info("Starting {task} ...");
        try {
            service.execute();
            log.info("{task} completed successfully");
        } catch (Exception e) {
            log.error("{task} failed: {}", e.getMessage(), e);
            // Notify admin
            notificationService.sendAlert("{task} failed", e.getMessage());
        }
    }
}

## Use Cases
- Low stock alerts (daily at 6 AM)
- Invoice overdue reminders (daily at 8 AM)
- Customer segment recalculation (daily at 2 AM)
- Expired reservation cleanup (hourly)
- Recurring invoice generation (daily at 1 AM)
- Cache warmup (after deploy)

## Rules
- Log start and end (with duration)
- Catch exceptions (don't let scheduler die)
- Send alert on failure
- Consider locking (ShedLock) to prevent double execution
- Make idempotent (safe to retry)
- Configurable cron expression (env var)
- Test in staging before enabling in production
```
