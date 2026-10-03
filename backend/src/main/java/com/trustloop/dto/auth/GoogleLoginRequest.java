package com.trustloop.dto.auth;

import com.trustloop.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Google OAuth login payload containing Google ID Token")
public record GoogleLoginRequest(
    @NotBlank(message = "Google ID token/credential is required")
    @Schema(description = "ID Token JWT obtained from Google Identity Services", example = "eyJhbGciOiJSUzI1NiIs...")
    String idToken,

    @Schema(description = "Optional role for first-time registration (defaults to CUSTOMER)", example = "CUSTOMER")
    Role role
) {}
