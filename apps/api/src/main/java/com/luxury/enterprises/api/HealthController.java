package com.luxury.enterprises.api;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

  @GetMapping("/api/health")
  public ResponseEntity<Map<String, Object>> health() {
    return ResponseEntity.ok(
      Map.of("status", "UP", "service", "luxury-enterprises-api", "version", "0.1.0")
    );
  } // <-- Aquí cerramos correctamente el método health()

  @GetMapping("/api/status")
  public ResponseEntity<Map<String, Object>> status() {
    // Aquí puedes agregar métricas básicas o simplemente un estado general
    return ResponseEntity.ok(
      Map.of(
        "status", "OPERATIONAL",
        "timestamp", System.currentTimeMillis(),
        "database", "CONNECTED" // Ejemplo de lo que podrías verificar después
      )
    );
  }
}
