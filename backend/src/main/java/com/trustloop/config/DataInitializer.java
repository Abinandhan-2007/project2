package com.trustloop.config;

import com.trustloop.entity.Role;
import com.trustloop.entity.User;
import com.trustloop.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Seeds initial demo accounts on startup if database is empty.
 * Accounts:
 * - customer@trustloop.com / password123 (CUSTOMER)
 * - provider@trustloop.com / password123 (PROVIDER)
 * - admin@trustloop.com / password123 (ADMIN)
 */
@Configuration
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    public CommandLineRunner seedDemoUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            seedUserIfNotExists(userRepository, passwordEncoder, "customer@trustloop.com", "password123", "Alex Morgan", Role.CUSTOMER, "+1-555-0101");
            seedUserIfNotExists(userRepository, passwordEncoder, "provider@trustloop.com", "password123", "Sam Rivera (Licensed Electrician)", Role.PROVIDER, "+1-555-0202");
            seedUserIfNotExists(userRepository, passwordEncoder, "admin@trustloop.com", "password123", "Platform Administrator", Role.ADMIN, "+1-555-0303");
        };
    }

    private void seedUserIfNotExists(
        UserRepository repository,
        PasswordEncoder encoder,
        String email,
        String rawPassword,
        String fullName,
        Role role,
        String phone
    ) {
        if (!repository.existsByEmail(email)) {
            User user = User.builder()
                .email(email)
                .passwordHash(encoder.encode(rawPassword))
                .fullName(fullName)
                .role(role)
                .phone(phone)
                .active(true)
                .build();
            repository.save(user);
            log.info("Seeded demo user account: {} [Role: {}]", email, role);
        }
    }
}
