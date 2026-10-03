package com.trustloop.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;
import java.util.Map;

/**
 * Consistent JSON error response structure.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Standardized error response structure")
public record ErrorResponse(
    @Schema(description = "HTTP status code", example = "400")
    int status,

    @Schema(description = "HTTP error title", example = "Bad Request")
    String error,

    @Schema(description = "Detailed error message", example = "Invalid input supplied")
    String message,

    @Schema(description = "Request path where the error occurred", example = "/api/v1/resource")
    String path,

    @Schema(description = "Timestamp of the error")
    Instant timestamp,

    @Schema(description = "Field-level validation error map if applicable")
    Map<String, String> validationErrors
) {
    public static ErrorResponse of(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path, Instant.now(), null);
    }

    public static ErrorResponse ofValidation(int status, String error, String message, String path, Map<String, String> errors) {
        return new ErrorResponse(status, error, message, path, Instant.now(), errors);
    }
}
