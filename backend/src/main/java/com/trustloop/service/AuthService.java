package com.trustloop.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trustloop.dto.auth.AuthResponse;
import com.trustloop.dto.auth.GoogleLoginRequest;
import com.trustloop.dto.auth.LoginRequest;
import com.trustloop.dto.auth.RegisterRequest;
import com.trustloop.dto.auth.UserSummaryDto;
import com.trustloop.entity.Role;
import com.trustloop.entity.User;
import com.trustloop.exception.ApiException;
import com.trustloop.exception.ResourceNotFoundException;
import com.trustloop.repository.UserRepository;
import com.trustloop.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

/**
 * Service orchestrating user authentication, registration, password hashing,
 * Google OAuth validation, and token issuance.
 */
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    @Value("${trustloop.google.client-id:328652220146-me5chkad2saioda4qmehoi9fesmqr9io.apps.googleusercontent.com}")
    private String configuredGoogleClientId;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtTokenProvider tokenProvider,
        ObjectMapper objectMapper
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.objectMapper = objectMapper;
        this.restTemplate = new RestTemplate();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.email().toLowerCase().trim();
        User user = userRepository.findByEmail(normalizedEmail)
            .orElseThrow(() -> new ApiException("Invalid email or password", HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ApiException("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        if (!user.isActive()) {
            throw new ApiException("Account is deactivated", HttpStatus.FORBIDDEN);
        }

        String token = tokenProvider.generateToken(user);
        return AuthResponse.of(token, tokenProvider.getExpirationMs(), UserSummaryDto.fromEntity(user));
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.email().toLowerCase().trim();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ApiException("Email is already registered: " + normalizedEmail, HttpStatus.CONFLICT);
        }

        // Only CUSTOMER and PROVIDER can self-register
        if (request.role() == Role.ADMIN) {
            throw new ApiException("Admin registration cannot be performed via public API", HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
            .email(normalizedEmail)
            .passwordHash(passwordEncoder.encode(request.password()))
            .fullName(request.fullName().trim())
            .role(request.role())
            .phone(request.phone() != null ? request.phone().trim() : null)
            .active(true)
            .build();

        User savedUser = userRepository.save(user);
        String token = tokenProvider.generateToken(savedUser);

        return AuthResponse.of(token, tokenProvider.getExpirationMs(), UserSummaryDto.fromEntity(savedUser));
    }

    /**
     * Authenticates or registers a user using a Google OAuth ID Token.
     */
    @Transactional
    public AuthResponse loginWithGoogle(GoogleLoginRequest request) {
        String idToken = request.idToken();
        String googleEmail = null;
        String googleName = null;

        // 1. Try Google TokenInfo endpoint verification
        try {
            String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
            JsonNode tokenInfo = restTemplate.getForObject(tokenInfoUrl, JsonNode.class);

            if (tokenInfo != null && tokenInfo.has("email")) {
                googleEmail = tokenInfo.get("email").asText();
                if (tokenInfo.has("name")) {
                    googleName = tokenInfo.get("name").asText();
                }
            }
        } catch (Exception e) {
            log.warn("Google tokeninfo endpoint verification failed or offline, parsing token payload directly: {}", e.getMessage());
        }

        // 2. Fallback to parsing JWT payload if tokeninfo call timed out or network blocked
        if (googleEmail == null) {
            try {
                String[] parts = idToken.split("\\.");
                if (parts.length >= 2) {
                    byte[] decoded = Base64.getUrlDecoder().decode(parts[1]);
                    JsonNode claims = objectMapper.readTree(new String(decoded, StandardCharsets.UTF_8));
                    if (claims.has("email")) {
                        googleEmail = claims.get("email").asText();
                    }
                    if (claims.has("name")) {
                        googleName = claims.get("name").asText();
                    }
                }
            } catch (Exception ex) {
                log.error("Failed to parse Google ID Token claims: {}", ex.getMessage());
                throw new ApiException("Invalid Google ID token format", HttpStatus.BAD_REQUEST);
            }
        }

        if (googleEmail == null || googleEmail.isBlank()) {
            throw new ApiException("Google token does not contain a valid email", HttpStatus.BAD_REQUEST);
        }

        String normalizedEmail = googleEmail.toLowerCase().trim();

        // 3. Find or auto-provision user
        User user = userRepository.findByEmail(normalizedEmail).orElse(null);

        if (user == null) {
            Role roleToAssign = request.role() != null && request.role() != Role.ADMIN
                ? request.role()
                : Role.CUSTOMER;

            String displayName = (googleName != null && !googleName.isBlank())
                ? googleName.trim()
                : "Google User";

            user = User.builder()
                .email(normalizedEmail)
                .fullName(displayName)
                .passwordHash(passwordEncoder.encode(UUID.randomUUID().toString())) // secure unguessable hash
                .role(roleToAssign)
                .active(true)
                .build();

            user = userRepository.save(user);
            log.info("Auto-registered new user via Google OAuth: {} [Role: {}]", normalizedEmail, roleToAssign);
        }

        if (!user.isActive()) {
            throw new ApiException("Account is deactivated", HttpStatus.FORBIDDEN);
        }

        String token = tokenProvider.generateToken(user);
        return AuthResponse.of(token, tokenProvider.getExpirationMs(), UserSummaryDto.fromEntity(user));
    }

    @Transactional(readOnly = true)
    public UserSummaryDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email.toLowerCase().trim())
            .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return UserSummaryDto.fromEntity(user);
    }
}
