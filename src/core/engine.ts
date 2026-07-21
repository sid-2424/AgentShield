import {
  SecurityPolicy,
  ToolInvocation,
  ShieldVerdict,
  AuditEvent
} from "../types.js";

export class PolicyEngine {
  constructor(private readonly policy: SecurityPolicy) {}

  evaluate(invocation: ToolInvocation): ShieldVerdict {

    // Existing evaluation logic
    let verdict: ShieldVerdict = {
      allowed: true,
      requiresApproval: false,
      risk: "LOW"
    };

    // Existing rule evaluation...
    // (Leave your current rule loop exactly as it is)

    // Emit audit event
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