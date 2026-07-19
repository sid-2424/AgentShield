import { Rule } from "./rule.js";
import { ShieldVerdict, ToolInvocation } from "../types.js";

export class SSRFRule implements Rule {

    evaluate(invocation: ToolInvocation): ShieldVerdict | null {

        const payload = JSON.stringify(invocation.args).toLowerCase();

        const blocked = [
            "localhost",
            "127.0.0.1",
            "169.254.169.254",
            "10.",
            "172.16.",
            "192.168."
        ];

        const hit = blocked.find(v => payload.includes(v));

        if (!hit) {
            return null;
        }

        return {
            allowed: false,
            requiresApproval: false,
            risk: "HIGH",
            reason: `Potential SSRF target detected (${hit})`
        };
    }
}