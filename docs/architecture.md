# TrustLoop Architecture & System Design

## 1. System Overview
**TrustLoop** is an open, placement-ready local services marketplace (electricians, plumbers, appliance technicians, tutors) equipped with an **Evidence-Gap Guided Service Recovery Engine**.

Instead of treating disputes subjectively or using subjective reviews, TrustLoop operates on **verifiable claims**:
1. Every agreed job item is converted into an explicit, auditable **Claim**.
2. Work verification evidence (photos, receipts, test readings, signed timestamps) is attached directly to claims.
3. When a service dispute is initiated, the **Recovery Engine** quantifies evidence gaps, ranks evidence requests by expected uncertainty reduction vs. cost, applies strict **fair-opportunity checks**, and recommends corrective action.
4. **Guiding Invariant:** *Missing evidence is NEVER treated as proof of fault. It is decision support, not a legal verdict.*

---

## 2. Layered Backend Architecture (Spring Boot Monolith)

The backend is organized into strictly segregated layers within package `com.trustloop`:

```
backend/src/main/java/com/trustloop/
├── config/             # Security, CORS, Swagger/OpenAPI, JPA configurations
├── security/           # JWT filters, token providers, user details services (Phase 2)
├── controller/         # Thin REST endpoints; delegates immediately to services
├── service/            # Core business logic and transaction boundaries
├── repository/         # Spring Data JPA repositories with custom query methods
├── entity/             # JPA entity definitions mapping database schema
├── dto/                # Request and response transfer objects (entities never exposed)
├── recovery/           # Pure recovery engine domain logic & unit test suite
└── exception/          # GlobalExceptionHandler and custom ApiException hierarchy
```

### Architectural Rules
- **Thin Controllers**: Controllers only validate input, delegate to services, and return DTOs.
- **DTO Isolation**: Entities are never exposed over REST endpoints.
- **Backend Authorization**: Role and ownership checks are strictly enforced in the backend (never trusted from UI).
- **Dedicated Recovery Domain**: The recovery engine lives in a standalone `recovery` package, independent of controllers and database repos, making it 100% deterministically unit-testable.
- **Flyway Migrations**: All schema modifications are versioned in `db/migration/V*.sql`.

---

## 3. Evidence-Gap Recovery Engine Mathematical Formulation

### 3.1 Claim Coverage ($c_i$)
For claim $i$, coverage measures the proportion of satisfied requirements:
$$c_i = \frac{\text{satisfied requirements}_i}{\text{total applicable requirements}_i} \quad \in [0, 1]$$

### 3.2 Evidence Gap Score ($G_i$)
The gap score balances missing coverage against explicit conflict indicators:
$$G_i = w_i \cdot (1 - c_i) + \lambda_i \cdot x_i$$
- $w_i \in [0, 1]$: Criticality weight of claim $i$ (e.g. electrical safety vs. cosmetic cleanup).
- $x_i \in [0, 1]$: Conflict indicator (conflicting evidence or contradictory assertions).
- $\lambda_i \ge 0$: Weighting assigned to conflicts.
- Gap states: `MISSING`, `INCONSISTENT`, `STALE`, `UNVERIFIABLE`.

### 3.3 Request Priority Ranking ($P(q)$)
When requesting additional evidence from a party, the engine computes:
$$P(q) = \frac{\text{expected\_uncertainty\_reduction}(q)}{\text{cost}(q) + \epsilon}$$
- Where $\text{cost}(q)$ accounts for party friction, monetary cost, or logistical burden.
- $\epsilon > 0$ avoids division by zero.

### 3.4 Fair-Opportunity Decision Checks
Before recommending any adverse action (e.g., `REASSIGN_PROVIDER` or customer penalty):
1. **Capacity to Supply**: Can this party reasonably supply this evidence?
2. **Fair Notice**: Were they explicitly asked with a reasonable response window?
3. **External Factors**: Was the evidence outside their reasonable control (e.g. weather, third-party utility)?
4. **Action Hierarchy**:
   - `REQUEST_EVIDENCE`
   - `REQUEST_CLARIFICATION`
   - `FOLLOW_UP_VISIT`
   - `SECOND_OPINION`
   - `REASSIGN_PROVIDER`
   - `HUMAN_REVIEW`

---

## 4. Database Schema (Core Tables)

1. `users`: Authentication, UUID primary key, password hash, role (`CUSTOMER`, `PROVIDER`, `ADMIN`).
2. `provider_profiles`: Provider bio, trade category, hourly rates, verified credentials.
3. `service_listings`: Market offerings posted by providers.
4. `bookings`: Customer booking requests and appointment scheduling.
5. `quotations`: Detailed price quotes and itemized task breakdown.
6. `claims`: Individual verifiable work items created from accepted quotations.
7. `evidence`: Photos, test results, receipts, attached metadata per claim.
8. `service_cases`: Dispute cases opened for jobs requiring resolution.
9. `gap_records`: Identified coverage and conflict gaps evaluated per case.
10. `recovery_actions`: Engine-generated action recommendations with audit trail.
11. `case_events`: Immutable audit trail of state transitions and human inputs.
