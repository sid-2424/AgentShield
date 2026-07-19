import {
    ShieldVerdict,
    ToolInvocation
} from "../types.js";

import { Rule } from "./rule.js";

export class ApprovalRule implements Rule {

    constructor(
        private readonly approvalTools: string[]
    ) {}

    evaluate(invocation: ToolInvocation): ShieldVerdict | null {

        if (!this.approvalTools.includes(invocation.tool)) {
            return null;
        }

        return {
            allowed: true,
            requiresApproval: true,
            risk: "MEDIUM"
        };
    }
}