import { SecurityPolicy, ShieldVerdict, ToolInvocation } from "../types.js";

export class PolicyEngine {
  constructor(private readonly policy: SecurityPolicy) {}

  evaluate(invocation: ToolInvocation): ShieldVerdict {
    // Rule 1: Tool allowlist
    if (!this.policy.allowedTools.includes(invocation.tool)) {
      return {
        allowed: false,
        requiresApproval: false,
        risk: "HIGH",
        reason: `Tool '${invocation.tool}' is not permitted.`
      };
    }

    // Rule 2: Human approval
    if (
      this.policy.requireApproval?.includes(invocation.tool)
    ) {
      return {
        allowed: true,
        requiresApproval: true,
        risk: "MEDIUM"
      };
    }

    // Rule 3: Destructive keyword detection
    if (
      invocation.provenance === "UNTRUSTED_USER" &&
      this.policy.destructiveKeywords?.length
    ) {
      const serialized = JSON.stringify(invocation.args).toLowerCase();

      const matched = this.policy.destructiveKeywords.find(keyword =>
        serialized.includes(keyword.toLowerCase())
      );

      if (matched) {
        return {
          allowed: false,
          requiresApproval: false,
          risk: "HIGH",
          reason: `Blocked because '${matched}' was detected in untrusted input.`
        };
      }
    }

    return {
      allowed: true,
      requiresApproval: false,
      risk: "LOW"
    };
  }
}