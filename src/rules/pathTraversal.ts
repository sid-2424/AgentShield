import { Rule } from "./rule.js";
import { ShieldVerdict, ToolInvocation } from "../types.js";

export class PathTraversalRule implements Rule {

    evaluate(invocation: ToolInvocation): ShieldVerdict | null {

        const payload = JSON.stringify(invocation.args);

        const dangerousPatterns = [
            "../",
            "..\\",
            "/etc/",
            "/proc/",
            "/sys/",
            "C:\\Windows",
            "System32"
        ];

        const match = dangerousPatterns.find(pattern =>
            payload.includes(pattern)
        );

        if (!match) {
            return null;
        }

        return {
            allowed: false,
            requiresApproval: false,
            risk: "HIGH",
            reason: `Path traversal detected (${match})`
        };

    }

}