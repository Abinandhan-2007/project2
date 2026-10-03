package com.trustloop.dto.auth;

import com.trustloop.entity.Role;
import com.trustloop.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "Safe public user profile data")
public record UserSummaryDto(
    @Schema(description = "User unique identifier")
    UUID id,

    @Schema(description = "User email address", example = "customer@trustloop.com")
    String email,

    @Schema(description = "User full name", example = "Jane Doe")
    String fullName,

    @Schema(description = "User platform role", example = "CUSTOMER")
    Role role,

    @Schema(description = "Optional phone number", example = "+1-555-0199")
    String phone
) {
    public static UserSummaryDto fromEntity(User user) {
        return new UserSummaryDto(
            user.getId(),
            user.getEmail(),
            user.getFullName(),
            user.getRole(),
            user.getPhone()
        );
    }
}
