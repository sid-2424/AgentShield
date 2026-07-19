import {
    ShieldVerdict,
    ToolInvocation
} from "../types.js";

import { Rule } from "./rule.js";

export class AllowlistRule implements Rule {

    constructor(
        private readonly allowedTools: string[]
    ) {}

    evaluate(invocation: ToolInvocation): ShieldVerdict | null {

        if (this.allowedTools.includes(invocation.tool)) {
            return null;
        }

        return {
            allowed: false,
            requiresApproval: false,
            risk: "HIGH",
            reason: `Tool '${invocation.tool}' is not permitted.`
        };
    }
}