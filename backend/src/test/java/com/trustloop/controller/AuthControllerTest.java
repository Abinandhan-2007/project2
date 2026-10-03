package com.trustloop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trustloop.dto.auth.LoginRequest;
import com.trustloop.dto.auth.RegisterRequest;
import com.trustloop.entity.Role;
import com.trustloop.entity.User;
import com.trustloop.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        // Seed a known test customer
        User customer = User.builder()
            .email("test.customer@trustloop.com")
            .passwordHash(passwordEncoder.encode("securePass123"))
            .fullName("Alice Customer")
            .role(Role.CUSTOMER)
            .phone("+1-555-9999")
            .active(true)
            .build();
        userRepository.save(customer);
    }

    @Test
    @DisplayName("POST /api/auth/login succeeds with valid credentials and returns JWT")
    void testLoginSuccess() throws Exception {
        LoginRequest request = new LoginRequest("test.customer@trustloop.com", "securePass123");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success", is(true)))
            .andExpect(jsonPath("$.data.token", notNullValue()))
            .andExpect(jsonPath("$.data.type", is("Bearer")))
            .andExpect(jsonPath("$.data.user.email", is("test.customer@trustloop.com")))
            .andExpect(jsonPath("$.data.user.role", is("CUSTOMER")));
    }

    @Test
    @DisplayName("POST /api/auth/login fails with invalid password")
    void testLoginInvalidPassword() throws Exception {
        LoginRequest request = new LoginRequest("test.customer@trustloop.com", "wrongPassword");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.status", is(401)));
    }

    @Test
    @DisplayName("POST /api/auth/register creates new provider account and returns 201 with JWT")
    void testRegisterProvider() throws Exception {
        RegisterRequest request = new RegisterRequest(
            "new.provider@trustloop.com",
            "providerPass123",
            "Bob Plumber",
            Role.PROVIDER,
            "+1-555-8888"
        );

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.success", is(true)))
            .andExpect(jsonPath("$.data.token", notNullValue()))
            .andExpect(jsonPath("$.data.user.email", is("new.provider@trustloop.com")))
            .andExpect(jsonPath("$.data.user.role", is("PROVIDER")));
    }

    @Test
    @DisplayName("GET /api/auth/me requires authentication and returns user profile when token is provided")
    void testGetAuthenticatedUser() throws Exception {
        // First login Alice to get JWT
        LoginRequest loginRequest = new LoginRequest("test.customer@trustloop.com", "securePass123");
        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
            .andExpect(status().isOk())
            .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString();
        String token = objectMapper.readTree(responseBody).path("data").path("token").asText();

        // Access protected endpoint with Bearer token
        mockMvc.perform(get("/api/auth/me")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success", is(true)))
            .andExpect(jsonPath("$.data.email", is("test.customer@trustloop.com")))
            .andExpect(jsonPath("$.data.fullName", is("Alice Customer")))
            .andExpect(jsonPath("$.data.role", is("CUSTOMER")));
    }

    @Test
    @DisplayName("GET /api/auth/me rejects unauthenticated request without token")
    void testGetMeUnauthorizedWithoutToken() throws Exception {
        mockMvc.perform(get("/api/auth/me")
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isUnauthorized());
    }
}
