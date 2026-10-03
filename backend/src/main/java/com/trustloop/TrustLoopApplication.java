package com.trustloop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TrustLoop Application Entrypoint.
 *
 * TrustLoop is a local services marketplace with an
 * Evidence-Gap Guided Service Recovery Engine.
 */
@SpringBootApplication
public class TrustLoopApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrustLoopApplication.class, args);
    }
}
