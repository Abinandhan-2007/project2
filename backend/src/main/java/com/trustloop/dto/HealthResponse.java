package com.trustloop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

/**
 * Health check status response.
 */
@Schema(description = "Health status payload for system uptime and readiness")
public record HealthResponse(
    @Schema(description = "Service status indicator", example = "UP")
    String status,

    @Schema(description = "Service identifier", example = "TrustLoop API")
    String service,

    @Schema(description = "Application version", example = "1.0.0")
    String version,

    @Schema(description = "ISO-8601 UTC timestamp of the health check")
    Instant timestamp,

    @Schema(description = "Active runtime environment", example = "development")
    String environment
) {
    public static HealthResponse up(String service, String version, String environment) {
        return new HealthResponse("UP", service, version, Instant.now(), environment);
    }
}
