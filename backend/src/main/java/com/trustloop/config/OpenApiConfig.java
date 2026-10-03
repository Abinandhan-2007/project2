package com.trustloop.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger / OpenAPI 3.0 configuration for TrustLoop REST API.
 */
@Configuration
public class OpenApiConfig {

    @Value("${trustloop.app.name:TrustLoop API}")
    private String appName;

    @Value("${trustloop.app.version:1.0.0}")
    private String appVersion;

    @Value("${trustloop.app.description:Local Services Marketplace with Evidence-Gap Guided Service Recovery Engine}")
    private String appDescription;

    @Bean
    public OpenAPI trustLoopOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
            .info(new Info()
                .title(appName)
                .version(appVersion)
                .description(appDescription + "\n\n"
                    + "### Architecture & Core Principles\n"
                    + "- **Verifiable Claims**: Agreed work is broken into auditable claims.\n"
                    + "- **Evidence Attachment**: Photos, receipts, test readings, and timestamps.\n"
                    + "- **Evidence-Gap Recovery Engine**: Fair-opportunity decision support, never legal verdict.\n"
                    + "- **Role-Based Access**: CUSTOMER, PROVIDER, ADMIN.")
                .contact(new Contact()
                    .name("TrustLoop Engineering")
                    .email("support@trustloop.local"))
                .license(new License().name("Apache 2.0").url("https://www.apache.org/licenses/LICENSE-2.0")))
            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(new Components()
                .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                    .name(securitySchemeName)
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT")
                    .description("Provide JWT Bearer token generated from /api/v1/auth/login")));
    }
}
