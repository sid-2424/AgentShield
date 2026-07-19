import {
    SecurityPolicy,
    ShieldVerdict,
    ToolInvocation
} from "../types.js";

import { Rule } from "../rules/rule.js";
import { AllowlistRule } from "../rules/allowlist.js";
import { ApprovalRule } from "../rules/approval.js";
import { DestructiveKeywordRule } from "../rules/destructive.js";
import { PathTraversalRule } from "../rules/pathTraversal.js";
import { SSRFRule } from "../rules/ssrf.js";

export class PolicyEngine {

    private readonly rules: Rule[];

    constructor(policy: SecurityPolicy) {

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

        for (const rule of this.rules) {

            const result = rule.evaluate(invocation);

            if (result) {
                return result;
            }

        }

        return {
            allowed: true,
            requiresApproval: false,
            risk: "LOW"
        };

    }

}