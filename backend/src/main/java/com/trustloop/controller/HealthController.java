package com.trustloop.controller;

import com.trustloop.dto.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Arrays;

/**
 * Health check controller for system monitoring, uptime probes,
 * and frontend connectivity verification.
 */
@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Check", description = "Endpoints for checking system health and deployment readiness")
public class HealthController {

    @Value("${trustloop.app.name:TrustLoop API}")
    private String appName;

    @Value("${trustloop.app.version:1.0.0}")
    private String appVersion;

    private final Environment environment;

    public HealthController(Environment environment) {
        this.environment = environment;
    }

    @GetMapping
    @Operation(summary = "Check API Health Status", description = "Returns system operational status, timestamp, service name, and active profile.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "System is operational")
    })
    public ResponseEntity<HealthResponse> getHealth() {
        String[] activeProfiles = environment.getActiveProfiles();
        String currentEnv = activeProfiles.length > 0 ? String.join(",", activeProfiles) : "development";

        HealthResponse response = new HealthResponse(
            "UP",
            appName,
            appVersion,
            Instant.now(),
            currentEnv
        );

        return ResponseEntity.ok(response);
    }
}
