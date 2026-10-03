package com.trustloop;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class TrustLoopApplicationTests {

    @Test
    @DisplayName("Context loads successfully")
    void contextLoads() {
        // Verifies Spring context initializes without exceptions
    }
}
