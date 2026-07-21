import {
    SecurityPolicy,
    ShieldVerdict,
    ToolInvocation,
    AuditEvent
} from "../types.js";

import { Rule } from "../rules/rule.js";
import { AllowlistRule } from "../rules/allowlist.js";
import { ApprovalRule } from "../rules/approval.js";
import { DestructiveKeywordRule } from "../rules/destructive.js";
import { PathTraversalRule } from "../rules/pathTraversal.js";
import { SSRFRule } from "../rules/ssrf.js";

export class PolicyEngine {

    private readonly rules: Rule[];
    private readonly policy: SecurityPolicy;

    constructor(policy: SecurityPolicy) {

        this.policy = policy;

        this.rules = [

            new AllowlistRule(policy.allowedTools),

            new ApprovalRule(
                policy.requireApproval ?? []
            ),

            new DestructiveKeywordRule(
                policy.destructiveKeywords ?? []
            )

        ];

        if (policy.blockPathTraversal !== false) {
            this.rules.push(new PathTraversalRule());
        }

        if (policy.blockSSRF !== false) {
            this.rules.push(new SSRFRule());
        }
    }

    evaluate(invocation: ToolInvocation): ShieldVerdict {

        let verdict: ShieldVerdict = {
            allowed: true,
            requiresApproval: false,
            risk: "LOW"
        };

        for (const rule of this.rules) {

            const result = rule.evaluate(invocation);

            if (result) {
                verdict = result;
                break;
            }

        }

        const event: AuditEvent = {
            timestamp: new Date().toISOString(),
            tool: invocation.tool,
            allowed: verdict.allowed,
            reason: verdict.reason,
            risk: verdict.risk
        };

        this.policy.auditLogger?.(event);

        return verdict;

    }

}