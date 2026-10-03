package com.trustloop.recovery;

/**
 * Contract and specification for the Evidence-Gap Guided Service Recovery Engine.
 *
 * <p>Mathematical & Architectural Principles:
 * <ul>
 *   <li><b>Coverage ($c_i$):</b>
 *       <code>c_i = satisfied requirements / total applicable requirements</code></li>
 *   <li><b>Gap Score ($G_i$):</b>
 *       <code>G_i = w_i * (1 - c_i) + lambda_i * x_i</code>
 *       (where $w_i$ = claim criticality, $x_i$ = conflict indicator [0..1], $\lambda_i$ = conflict weight)</li>
 *   <li><b>Gap Types:</b> MISSING, INCONSISTENT, STALE, UNVERIFIABLE</li>
 *   <li><b>Evidence Request Ranking ($P(q)$):</b>
 *       <code>P(q) = expected_uncertainty_reduction(q) / (cost(q) + epsilon)</code></li>
 *   <li><b>Fair-Opportunity Constraint:</b>
 *       Missing evidence is NEVER treated as proof of fault. It is decision support, not a legal verdict.
 *       Verifies who can reasonably supply evidence, if reasonable response window was given,
 *       and if evidence was outside their control before recommending provider reassignment or penalty.</li>
 *   <li><b>Actions:</b>
 *       REQUEST_EVIDENCE, REQUEST_CLARIFICATION, FOLLOW_UP_VISIT, SECOND_OPINION, REASSIGN_PROVIDER, HUMAN_REVIEW</li>
 * </ul>
 *
 * Full implementation and deterministic unit tests are scheduled for Phase 5.
 */
public interface RecoveryEngineContract {

    enum GapType {
        MISSING,
        INCONSISTENT,
        STALE,
        UNVERIFIABLE
    }

    enum RecoveryActionType {
        REQUEST_EVIDENCE,
        REQUEST_CLARIFICATION,
        FOLLOW_UP_VISIT,
        SECOND_OPINION,
        REASSIGN_PROVIDER,
        HUMAN_REVIEW
    }
}
