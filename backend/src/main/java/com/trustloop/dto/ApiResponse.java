package com.trustloop.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

/**
 * Standard API response wrapper for consistent endpoint responses.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Standard API response wrapper")
public record ApiResponse<T>(
    @Schema(description = "Success indicator flag", example = "true")
    boolean success,

    @Schema(description = "Human-readable message", example = "Operation completed successfully")
    String message,

    @Schema(description = "Payload data")
    T data,

    @Schema(description = "Timestamp of response generation")
    Instant timestamp
) {
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data, Instant.now());
    }

    public static <T> ApiResponse<T> success(T data) {
        return success("Success", data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, Instant.now());
    }
}
