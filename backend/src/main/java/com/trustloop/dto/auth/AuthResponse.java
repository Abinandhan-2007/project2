package com.trustloop.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Authentication response containing JWT token and user profile")
public record AuthResponse(
    @Schema(description = "JWT Bearer access token")
    String token,

    @Schema(description = "Token type prefix", example = "Bearer")
    String type,

    @Schema(description = "Token validity in milliseconds", example = "86400000")
    long expiresIn,

    @Schema(description = "Authenticated user profile details")
    UserSummaryDto user
) {
    public static AuthResponse of(String token, long expiresIn, UserSummaryDto user) {
        return new AuthResponse(token, "Bearer", expiresIn, user);
    }
}
