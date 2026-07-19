import {
    ShieldVerdict,
    ToolInvocation
} from "../types.js";

import { Rule } from "./rule.js";

export class DestructiveKeywordRule implements Rule {

    constructor(
        private readonly keywords: string[]
    ) {}

    evaluate(invocation: ToolInvocation): ShieldVerdict | null {

        if (invocation.provenance !== "UNTRUSTED_USER") {
            return null;
        }

        const payload = JSON.stringify(invocation.args).toLowerCase();

        const hit = this.keywords.find(keyword =>
            payload.includes(keyword.toLowerCase())
        );

        if (!hit) {
            return null;
        }

        return {
            allowed: false,
            requiresApproval: false,
            risk: "HIGH",
            reason: `Detected destructive keyword '${hit}'.`
        };
    }
}