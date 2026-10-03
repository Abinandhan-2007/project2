package com.trustloop.dto.auth;

import com.trustloop.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Schema(description = "Registration payload for new users")
public record RegisterRequest(
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Schema(description = "User email address", example = "customer@trustloop.com")
    String email,

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Schema(description = "Account password", example = "password123")
    String password,

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 150, message = "Full name must be between 2 and 150 characters")
    @Schema(description = "User's full name", example = "Jane Doe")
    String fullName,

    @NotNull(message = "Role must be specified (CUSTOMER or PROVIDER)")
    @Schema(description = "Role to register as (CUSTOMER or PROVIDER)", example = "CUSTOMER")
    Role role,

    @Schema(description = "Contact phone number", example = "+1-555-0199")
    String phone
) {}
